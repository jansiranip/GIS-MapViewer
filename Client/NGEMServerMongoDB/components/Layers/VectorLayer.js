import React, { Component } from 'react';
//import * as ol from 'openlayers';
import Util from '../Util';
import Map from '../MapComponent';
import actions from '../../redux/actions'

class VectorLayer extends Component {

  constructor(props) {
    super(props);
    layer: ol.layer.Vector;
    console.log("Vector LAYER Construtor");

    this.options = {
      renderOrder: undefined,
      extent: undefined,
      minResolution: undefined,
      maxResolution: undefined,
      opacity: undefined,
      renderBuffer: undefined,
      source: undefined,
      style: undefined,
      updateWhileAnimating: undefined,
      updateWhileInteracting: undefined,
      visible: undefined,
      title: ''
    };

    this.events = {
      'change': undefined,
      'change:extent': undefined,
      'change:maxResolution': undefined,
      'change:minResolution': undefined,
      'change:opacity': undefined,
      'change:preload': undefined,
      'change:source': undefined,
      'change:visible': undefined,
      'change:zIndex': undefined,
      'postcompose': undefined,
      'precompose': undefined,
      'propertychange': undefined,
      'render': undefined
    };


    this.Util = new Util();

  }
 


  render() {
    return null;
  }
  populateVectorSource(options){
    //console.log(options);
    var projectionSet='';

    var esrijsonFormat = new ol.format.EsriJSON();
    var serviceUrl=options.serviceURL;
    //console.log(serviceUrl);
    var ParcelVectorsource;
   // var self=this;
    return(ParcelVectorsource= new ol.source.Vector({
     
      loader: function(extent, resolution, projection) {
          
          projectionSet=projection;      
              //console.log(extent);
              var url = serviceUrl + '/query/?f=json&' +
              'returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=' +
              encodeURIComponent('{"xmin":' + extent[0] + ',"ymin":' +
                  extent[1] + ',"xmax":' + extent[2] + ',"ymax":' + extent[3] +
                  ',"spatialReference":{"wkid":102100}}') +
              '&geometryType=esriGeometryEnvelope&inSR=102100&outFields=*' +
              '&outSR=102100';           
              //console.log(url);
          $.ajax({url: url, dataType: 'jsonp', success: function(response) {
            if (response.error) {
              alert(response.error.message + '\n' +
                  response.error.details.join('\n'));
            } else {   
                //console.log(response);
              var features = esrijsonFormat.readFeatures(response, {
                featureProjection: projection
              });         
              if (features.length > 0) {
                  ParcelVectorsource.addFeatures(features);
              }
            }
           // console.log("completed");
          }});
          //console.log("completed");
         
        },
        strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
          tileSize: 512
        })),
        projection_:projectionSet
  }));

    
     


  }
  componentDidMount() {
    console.log("Vector Layer mounted");
    let options = this.Util.getOptions(Object.assign(this.options, this.props.options));
    

    var sourceRetrived=this.populateVectorSource(options);
    
    options.source=sourceRetrived;
    options.zIndex=2;
    this.layer = new ol.layer.Vector(options);
    
    this.props.addLayer(this.layer);
   
   
   
    let olEvents = this.Util.getEvents(this.events, this.props);
    for (let eventName in olEvents) {
      this.layer.on(eventName, olEvents[eventName]);
    }
    //this.props.addLayer(this.layer);
  }

  componentWillReceiveProps(nextProps) {
    console.log("Vector layer Receice props");
    if(!(_.isEqual(nextProps,this.props))){
      let options = this.Util.getOptions(Object.assign(this.options, this.props.options));
      this.layer = new ol.layer.Vector(options);
      if (this.props.zIndex) {
        this.layer.setZIndex(this.props.zIndex);
      }
      let olEvents = this.Util.getEvents(this.events, this.props);
      for (let eventName in olEvents) {
        this.layer.on(eventName, olEvents[eventName]);
      }
    }
  }

  componentWillUnmount() {
    console.log("Vector layer Unmount");
   // this.props.mapComp.map.removeLayer(this.layer);
  }

}


export default VectorLayer;