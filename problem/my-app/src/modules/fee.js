import React from 'react';



class Fee extends React.Component {
    constructor() {
        super();

        this.state = {
          

        };

    };
    
    componentDidUpdate(prevProps){
      if(prevProps.dropData.length !== this.props.dropData.length){
        
      }
    }


   
    render() {
      if(this.state.selectProps === null){
        return 'loading...'
      }
        
    }


}


export default Fee;