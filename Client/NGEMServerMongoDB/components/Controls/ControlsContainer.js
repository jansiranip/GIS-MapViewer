import React,{Component} from 'react';

import Util from '../Util'

class Controls extends Component{

    constructor(props){
      console.log("Controls parent Constructor");
      
        super(props);
        this.options = {
            attribution  : undefined,
            attributionOptions: undefined,
            rotate: undefined,
            rotateOptions: undefined,
            zoom: undefined,
            zoomOptions: undefined
          };
          this.Util=new Util();
          this.options = this.Util.getOptions(Object['assign'](this.options, this.props));
    }
  
  render() {
    return (<div>{this.props.children}</div>);
  }

  componentDidMount () {} 

  componentWillUnmount () {}
}



export default Controls;