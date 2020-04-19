import React from 'react';
import Header from './header.js';
import Dropdown from './modules/drop-down';




class App extends React.Component {
   constructor() {
      super();
      this.state = {
         selectedFee: null,
         selectedCourse: null,
         selectedCountry: null,
         registerData : null,
         feeProps : null,
         countryProps: null,
         color: 'black',
         selectCourseProps:null,
         selectcourseDataProps:null,
         selectlevelData:null,
         selectlevelDataprops:null,
         selectedLevel:null,
         selectAmountDataprops:null,
         totalFee:null,
         color2:"green"
         
      };
  };


courseData={"ALL_COURSES":
{
   "ALL_COURSES medical": "MEDICAL",
   "ALL_COURSES Dental":"DENTAL",
   "ALL_COURSES Ayerveda":"AYERVEDA"
},"ALL_LEVEL":
{
      "ALL_LEVEL UG":"UG",
      "ALL_LEVEL PG":"PG",
      "ALL_LEVEL DIPLOMA":"UG-DIPLOMA",
      "ALL_LEVEL PH.D":"PH.D"
}

};

// handleSelectedAmount=(amount)=>{
//   console.log("hello",amount)
// }
totalCost=()=>{
   if(this.state.totalFee!=null){
      return (
      <p style={{color: this.state.color2}} > Total Amount: {this.state.totalFee}</p>//fee
      )

   }
}

handleSelectedlevel=(selectAmount)=>{
   const data= selectAmount.split(' ');
   selectAmount = data[0];
   console.log("slected lave", selectAmount)
   let AmountData = null;
   let selectedLevel = null;
   console.log("selected course", this.state.selectedCourse);
   AmountData =this.state.registerData[this.state.selectedFee]
                  [this.state.selectedCountry]
                  [this.state.selectedCourse]
                  [selectAmount];
   console.log("elese of all level", AmountData);
   var totalCost= AmountData.amount;//"amount obj"
  
   
   this.setState({ 
      selectedLevel: selectedLevel,
      totalFee:totalCost,
     
      // selectAmountDataprops:{
      // dropData:totalCost , 
      // handleChange: (amount) => this.handleSelectedAmount(amount)
      // }
   });
}



handleLevel=(level)=>{
  console.log(level)
   // const courseData =this.courseData;
  // console.log(courseData)
   const data= level.split(' ');
   level = data[0];
  let levelData = null;
  let selectedCourse = null;
   levelData =this.state.registerData[this.state.selectedFee][this.state.selectedCountry][level];
   let selectlevelData = {};  
   for(const property in levelData){
      if(property=="ALL_LEVEL"){
         
         selectlevelData = {...selectlevelData, ...this.courseData[property]};
      }
      else{
         selectlevelData[property]=property;
      }
   }
  
   this.setState({ 
      selectedCourse: level,
      
      selectlevelDataprops:{
      dropData: selectlevelData,
      handleChange: (selectAmount) => this.handleSelectedlevel(selectAmount)
      }
   });

   
}
handleCountryChange = (country) =>{
      console.log(country)

      const courseData =this.state.registerData[this.state.selectedFee][country];
      let selectcourseData = {};  
      for(const property in courseData){
         if(property=="ALL_COURSES"){
            selectcourseData = {...selectcourseData, ...this.courseData[property]};
         }
         else{
            selectcourseData[property] = property;
         }
      }
     
      this.setState({ 
         selectlevelDataprops:null,
         selectedCountry: country,
         
         totalFee:null,
         selectCourseProps:{
         dropData: selectcourseData,
         handleChange: (level) => this.handleLevel(level)
         }
      });
  }


handleFeeChange = (feeType)=>{
      console.log(feeType)
      const feeData =  this.state.registerData[feeType];
      let countryData = {};
   for(const property in feeData){
      countryData[property] = property;
   }
   this.setState({
      selectedFee:feeType,
      selectCourseProps: null,
      selectlevelDataprops:null,
      totalFee:null,
      countryProps:{
         dropData: countryData,
         handleChange: (country) => this.handleCountryChange(country)
      }
     
    });
    //console.log(countryData)
  }
  
   componentDidMount() {
      fetch("http://localhost:3000/data.json")
        .then(res =>res.json())
        .then(res => {
           let feeData = {};
            for(const property in res){
               feeData[property] = property;
            }
            this.setState({
               registerData: res,
               feeProps:{
                 dropData: feeData,
                 handleChange: (feeType) => this.handleFeeChange(feeType)
               }
             }); 
        })
        .catch((error) => {
          console.log(error.message)
          this.setState({
            isLoaded: true,
            error
          });
        })
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.    
    }
   rederCountry(){
      if(this.state.countryProps){
         return (
            <div className="form-group">
                     <label className="dropbtn country"  style={{color: this.state.color}}>Select Country</label>
                     <Dropdown title="Select Country" selectProps={this.state.countryProps}  />
                  </div>
         )
      }
   }
   rennderCourse(){
      if(this.state.selectCourseProps){
         return (<div className="form-group">
         <label className="dropbtn course"  style={{color: this.state.color}}>Select Courses</label>
         <Dropdown title="Select Courses" selectProps={this.state.selectCourseProps}  />
      </div>)
      }
   }
   renderlevel(){
      if(this.state.selectlevelDataprops){
      return(
         <div className="form-group">
            <label className="dropbtn level"  style={{color: this.state.color}}>Select Level</label>
            <Dropdown title="Select Level" selectProps={this.state.selectlevelDataprops}  />
         </div>  
      )
      }
   }
  render() {
     return (
        <div>
         <Header/>
           <form>
                  <div className="form-group">
                     <label className="dropbtn fee"  style={{color: this.state.color}}>Select Fee</label>
                     <Dropdown title="Select Fee" selectProps={this.state.feeProps}  />
                  </div>
                        {this.rederCountry()}
                        {this.rennderCourse()}
                        {this.renderlevel()}
                        
                     {/* <div className="form-group">
                        <label className="dropbtn"  style={{color: this.state.color}}>Select Amount</label>
                        <Dropdown title="Select Amount" selectProps={this.state.selectAmountDataprops}  />
                     </div>       */}
                  
                  {this.totalCost()}
            
               </form>
         </div>
     );
  }
}


export default App;
