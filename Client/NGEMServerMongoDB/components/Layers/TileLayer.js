import React,{Component} from 'react';
import Util from '../Util';
import Map from '../MapComponent';
import actions from '../../redux/actions'

class TileLayer extends Component{

    constructor(props){
        super(props); 
        console.log("Tile layer Constructor");
        layer: ol.layer.Tile;

        this.options = {
            zIndex: undefined,
            opacity: undefined,
            preload: undefined,
            source: undefined,
            visible: undefined,
            extent: undefined,
            minResolution: undefined,
            maxResolution: undefined,
            useInterimTilesOnError: undefined,
            title:''
        };

        this.events = {
            'change': undefined,
            'change:extent': undefined,
            'change:maxResolution': undefined,
            'change:minResolution': undefined,
            'change:opacity': undefined,
            'change:preload': undefined,
            'change:source': undefined,
            'change:useInterimTilesOnError': undefined,
            'change:visible': undefined,
            'change:zIndex': undefined,
            'postcompose': undefined,
            'precompose': undefined,
            'propertychange': undefined,
            'render': undefined
         };

      
        this.Util=new Util();
      
  }

  render() {
    return null;
  }
  populateSource(options){
    //console.log(options);
    if(options.sourceType=="XYZ"){
     return(new ol.source.XYZ({url:options.tileURL}));
    }
    else if(options.sourceType=="ArcGISRest"){
      return(new ol.source.TileArcGISRest({url:options.mapServerURL,params:options.params}));
    }
     


  }

  componentDidMount () {
    console.log("Tile layer mounted");
    //let options = this.Util.getOptions(Object.assign(this.options, this.props.options));
    let options = this.props.options;
    //console.log("base map options");
    //console.log(options.layerId);
    if(options.layerId==="SyGPr8uJz"){
      options.zIndex=1;
    }
    else if(options.layerId==="SyGPr8uJj"){
      options.zIndex=2;
    }
    else{
      options.zIndex=0;
    }
    //console.log(options);
    var sourceRetrived=this.populateSource(options);
    //console.log("Source retrieved");
    //console.log(sourceRetrived);
    options.source = sourceRetrived || new ol.source.OSM();
    
    this.layer = new ol.layer.Tile(options);
    if(this.props.options.zIndex){
      this.layer.setZIndex(this.props.options.zIndex);
    }
     

    let olEvents = this.Util.getEvents(this.events, this.props);
    for(let eventName in olEvents) {
      this.layer.on(eventName, olEvents[eventName]);
    }
    this.props.addLayer(this.layer);
  }

  componentWillReceiveProps (nextProps) {
    console.log("Tile layer Receice props");
   
    if(!(_.isEqual(nextProps,this.props))){
      //console.log("Tile layer Not equal");
      let options =  this.Util.getOptions(Object.assign(this.options, this.props.options));
      this.layer = new ol.layer.Tile(options);
      if(this.props.options.zIndex){
        this.layer.setZIndex(this.props.options.zIndex);
      }

      let olEvents = this.Util.getEvents(this.events, this.props);
      for(let eventName in olEvents) {
        this.layer.on(eventName, olEvents[eventName]);
      }
    }
  }
  
  componentWillUnmount () {
    console.log("Tile layer Unmount");
  //  this.props.mapComp.map.removeLayer(this.layer);
  }

}



export default TileLayer;