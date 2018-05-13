import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Util from '../Util';
import actions from '../../redux/actions'


class Overlay extends Component{

constructor(props){
    super(props);
    console.log("Overlay Constructor");
    
    overlay: ol.Overlay;
    el: HTMLElement;

    this.options = {
        id: undefined,
        element: undefined,
        offset: undefined,
        position: undefined,
        //positioning:"center-center",
        stopEvent: undefined,
        insertFirst: undefined,
        autoPan: true,
        autoPanAnimation: {
          duration: 250
        },
        autoPanMargin: undefined
      };
    
      this.events = {
        'change': undefined,
        'change:element': undefined,
        'change:map': undefined,
        'change:offset': undefined,
        'change:position': undefined,
        'change:positioning': undefined,
        'propertychange': undefined
      };
      this.Util=new Util();
}


 

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
  pickRandomProperty() {
    var prefix = ['bottom', 'center', 'top'];
    var randPrefix = prefix[Math.floor(Math.random() * prefix.length)];
    var suffix = ['left', 'center', 'right'];
    var randSuffix = suffix[Math.floor(Math.random() * suffix.length)];
    return randPrefix + '-' + randSuffix;
  }
  componentDidMount () {
    let options = this.Util.getOptions( Object['assign'](this.options, this.props));
    options.element = ReactDOM.findDOMNode(this).querySelector('div');
    console.log(ReactDOM.findDOMNode(this));
     console.log('options.element', options.element);
    this.overlay = new ol.Overlay(options);
    //console.log(this.overlay);
    var randomPositioning = this.pickRandomProperty();
    this.overlay.setPositioning(randomPositioning);
    //console.log(this.overlay);
    this.props.addOverlay(this.overlay);
    //this.props.mapComp.overlays.push(this.overlay);
  }
}

export default Overlay;