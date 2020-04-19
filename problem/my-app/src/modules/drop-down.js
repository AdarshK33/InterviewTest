import React from 'react';



class Dropdown extends React.Component {
    constructor(){
     super();
     this.state={
         color:'red'
     }
    };

    renderOption(){
        if(this.props.selectProps !== null){
            return Object.entries(this.props.selectProps.dropData).map(([key, value]) => {
              //  console.log(item);
                return (
                    <option value={key}>{value}</option>

                )
            })
        }
    }
    handleChange(e){
        if(e.target.value != ''){
            this.props.selectProps.handleChange(e.target.value)
        }
        
    }
    render() {
        return (
            <select className="form-control" 
                id="exampleFormControlSelect1"
                onChange={(e) => this.handleChange(e)} >
                <option value="">{this.props.title}</option>
                {this.renderOption()}
            </select>
        )
    }


}


export default Dropdown;