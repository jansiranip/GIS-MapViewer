import React, {Component} from 'react'


class Overlays extends Component{
    constructor(props){
      console.log("Overlay Parent Constructor");      
        super(props);
    }

  
    render(){
        
        return(<div>{this.props.children}</div>)
    }
}


export default Overlays;