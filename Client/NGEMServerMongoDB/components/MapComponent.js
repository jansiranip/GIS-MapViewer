import React, { Component } from "react";
import Util from './Util';
import axios from 'axios';
import HeaderContainer from './Header/HeaderContainer'


var serviceUrl = 'http://gisdemo1.cdmsmith.com/arcgis/rest/services/EastProvidence_Operational/MapServer/';
class Map extends Component {
  constructor(props) {
    console.log('MapComp constructor');
    //console.log(props);
    super(props);
    //this.mapDiv = document.getElementById('map');
    this.props = props;
    this.map = ol.Map;
    this.state = {
      initialRender: true
    }
    this.options = {
      pixelRation: undefined,
      keyboardEventTarget: undefined,
      loadTilesWhileAnimation: undefined,
      loadTilesWhileInteractiong: undefined,
      logo: undefined,
      renderer: undefined,
      target: 'map',
      setCenter: undefined,
      setZoom: undefined,
      setResolution: undefined,
      view: new ol.View({
        center: ol.proj.transform([-97.6114, 38.8403], 'EPSG:4326', 'EPSG:3857'),
        zoom: 7
      }),
      controls: undefined,
      interactions: undefined,
      layers: [],
      overlays: undefined
    };
    this.layers = [],
    this.interactions = [],
    this.controls = [],
    this.overlays = [],
    this.events = {
        'change': undefined,
        'change:layerGroup': undefined,
        'change:size': undefined,
        'change:target': undefined,
        'change:view': undefined,
        'click': undefined,
        'dblclick': undefined,
        'moveend': undefined,
        'pointerdrag': undefined,
        'pointermove': undefined,
        'postcompose': undefined,
        'postrender': undefined,
        'precompose': undefined,
        'propertychange': undefined,
        'singleclick': undefined
      };
    this.Util = new Util();


  }

  getFeatureDetail(feature) {

    var self = this;
    var esrijsonFormat = new ol.format.EsriJSON();
    var url = serviceUrl + 63 + '/query/?f=json&' + 'objectIds=' + feature.get("OBJECTID") +
      'returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields="Parcel_ID"';
    //console.log(url);
    var features = [];
    $.ajax({
      url: url, dataType: 'jsonp', success: function (response) {
        if (response.error) {
          alert(response.error.message + '\n' +
            response.error.details.join('\n'));
        } else {
          features = esrijsonFormat.readFeatures(response);
          // console.log(features);
          if (features.length > 0) {

            var tempFeatureData = {};
            tempFeatureData.currentFeature = feature;
            tempFeatureData.currentFeatureDetail = features[0];
            self.getPhotoLinks(feature.get("OBJECTID"), tempFeatureData);
            self.props.actions.addCurrentFeature(feature);

          }
          else
            console.log("No features");
        }
      }
    });
    //  console.log(features);
  }

  showPopup(evt) {
    console.log("Show popup click");
    //console.log(props);
    console.log(this.props.selectedTool);
    if (this.props.selectedTool != "Identify") {
      this.props.actions.addSelectedTool("Parcel");
    }

    if (this.props.selectedTool == "Identify") {      
      var geometry = evt.target.getEventCoordinate(evt.originalEvent);
      var extent = evt.target.getView().calculateExtent(evt.target.getSize());
      var selectInteraction;
      this.props.interactionsList.map(interactionObj => {
        if (interactionObj.interaction instanceof ol.interaction.Select)
          selectInteraction = interactionObj.interaction;
      });
      selectInteraction.getFeatures().clear();
      this.props.overlayList.forEach(function (i) {
        i.overlay.setPosition(geometry);
      });

      var geometryStr = "";
      var i = 1;
      
      for (var geo of geometry) {
        if (i !== geometry.length)
          geometryStr += geo.toString() + ",";
        else
          geometryStr += geo.toString();
        i++;
      }
      var i = 1;
      var extentStr = "";
    
      for (var geo of extent) {
        if (i !== extent.length)
          extentStr += geo.toString() + ",";
        else
          extentStr += geo.toString();
        i++;
      }
     
      axios.get('http://gisdemo1.cdmsmith.com/arcgis/rest/services/EastProvidence_Operational/MapServer/identify', {
        params: {
          tolerance: 10,
          returnGeometry: true,
          layers: 'all:30,27,32,28,0',
          imageDisplay: '1011,809,96',
          geometry: geometryStr,
          geometryType: 'esriGeometryPoint',
          sr: '102100',
          mapExtent: extentStr,
          f: 'json'
        }
      })
        .then(response => {
          //console.log("waiting for response");
         // console.log(response);

          if (response) {
            this.props.actions.addIdentifyFeatures(response);
           
          }

        })
        .catch(e => {
          console.log("error in access");
          console.log(e)
        })


    }
    else {
      var feature = evt.target.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {

        return feature;
      });
     // console.log(feature);
      if (feature) {
        // console.log(feature);
        // console.log(this);
        this.props.overlayList.forEach(function (i) {
          i.overlay.setPosition(feature.getGeometry().getFirstCoordinate());
        });

        this.getFeatureDetail(feature);
      }
      else {
        console.log("no feature found");
        alert("Parcels not found at that location");
      }
    }

  }


  showSearchDetailPopup(features) {
    //console.log(features);
    var selectInteraction;
        this.props.interactionsList.map(interactionObj => {
            if (interactionObj.interaction instanceof ol.interaction.Select)
                selectInteraction = interactionObj.interaction;
        });
        selectInteraction.getFeatures().clear();
    this.props.actions.addSelectedTool("Parcel");
    var url = serviceUrl + 0 + '/query/?f=json&' +
      'relationshipId=0&returnGeometry=true&objectIds=' + features.get("OBJECTID");

    var feature;
    var self = this;
    var tempFeatureData = {};
    //tempFeatureData.currentFeature=feature;
    tempFeatureData.currentFeatureDetail = features;
    self.getPhotoLinks(features.get("OBJECTID"), tempFeatureData);

    $.ajax({
      url: url, dataType: 'jsonp', success: function (response) {
        if (response.error) {
          alert(response.error.message + '\n' +
            response.error.details.join('\n'));
        } else {
          var esrijsonFormat = new ol.format.EsriJSON();
          feature = esrijsonFormat.readFeatures(response);
          //console.log(feature);
          if (feature.length > 0) {
            //console.log("features exist");

            feature = feature[0];
            if (feature) {
              self.props.overlayList.forEach(function (i) {

                i.overlay.setPosition(feature.getGeometry().getFirstCoordinate());
              });
              self.props.actions.addCurrentFeature(feature);
              self.props.interactionsList.map(interactionObj => {
                if (interactionObj.interaction instanceof ol.interaction.Select)
                    selectInteraction = interactionObj.interaction;
            });
            selectInteraction.getFeatures().push(feature); 
            }
            else {
              console.log("no feature found");
              var tempfeature = this.props.currentFeatureObj.feature;
              tempfeature.geometryName_ = "REMOVED";
              //this.props.actions.addCurrentFeature(tempfeature);
            }
          }
          else
            console.log("No features");
        }
      }
    });
   
  };
  getPhotoLinks(objectID, tempFeatureData) {


    var self = this;
    var url = serviceUrl + 0 + '/queryRelatedRecords/?f=json&' + 'objectIds=' + objectID +
      '&relationshipId=4&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=Photolink,Photo';

    var features = [];
    $.ajax({
      url: url, dataType: 'jsonp', success: function (response) {
        if (response.error) {
          alert(response.error.message + '\n' +
            response.error.details.join('\n'));
        } else {



          if (response.relatedRecordGroups.length > 0) {
            features = response.relatedRecordGroups[0].relatedRecords[0].attributes;

            tempFeatureData.currentFeaturePhoto = features;
            self.props.actions.addFeatureData(tempFeatureData);

          }
          else
            console.log("No features");
        }
      }
    });


  }


  componentWillUpdate(nextProps, nextState) {
    console.log("Map Component Will update");
    //console.log(nextProps);
    //console.log(nextState);
    console.log(this.state.initialRender);


    if (nextProps.layersList.length > 0) {
      if (nextState.initialRender) {
        this.setState({ initialRender: !this.state.initialRender });


        this.renderChildren(nextProps);
       

      }
      else
        return;
    }
  }
  componentDidMount() {
    console.log("Mapcomp Did mount");
    let options = this.Util.getOptions(Object.assign(this.options, this.props));
    !(options.view instanceof ol.View) && (options.view = new ol.View(options.view));
    let controlsCmp = this.Util.findChild(this.props.children, 'Controls') || {};
    let interactionsCmp = this.Util.findChild(this.props.children, 'Interactions') || {};

    options.controls = ol.control.defaults(controlsCmp.props).extend(this.controls);
    options.interactions = ol.interaction.defaults(interactionsCmp.props).extend(this.interactions);


    this.map = new ol.Map(options);
    //console.log(this.map);
    this.map.setTarget(options.target || this.mapDiv);

    let olEvents = this.Util.getEvents(this.events, this.props);
    this.map.on('singleclick', this.showPopup.bind(this));

    var selectParcels = new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: '#ff0000',
        width: 4
      }),
      fill: new ol.style.Fill({
        color: 'rgba(125, 250, 0, 0.5)',

      })
    });
    var selectInteraction = new ol.interaction.Select({ style: [selectParcels] });
    this.props.actions.addInteraction(selectInteraction);
    
  }


  componentWillReceiveProps(nextProps) {
    console.log("Map Component Recv props");
    if (!(_.isEqual(nextProps, this.props))) {

      if (!(jQuery.isEmptyObject(nextProps.feature))) {
        //console.log("component ele nextProps changed");
        //console.log(nextProps.feature);
        var selectInteraction;

        nextProps.interactionsList.map(interactionObj => {
          if (interactionObj.interaction instanceof ol.interaction.Select)
            selectInteraction = interactionObj.interaction;
        });
        if (this.props.selectedTool == "Identify") {
          selectInteraction.getFeatures().clear();

        }
        else if (this.props.selectedTool == "Parcel") {
          selectInteraction.getFeatures().clear();


          selectInteraction.getFeatures().push(nextProps.feature);

          console.log(selectInteraction.getFeatures());

          var optionsView = {
            size: this.map.getSize(),
            maxZoom: 19
          }
          if (nextProps.feature.geometryName_ != "REMOVED") {
            //Zoom to current feature
            this.map.getView().fit(nextProps.feature.getGeometry().getExtent(), optionsView);
          }
        }



      }

      if (this.props.view && nextProps.view.zoom !== this.props.view.zoom) {
        //console.log(nextProps.view.zoom);
        this.map.getView().setZoom(nextProps.view.zoom);
      }

    }

  }
  renderChildren(nextProps) {
    const { children } = nextProps;
    console.log("Mapcomp renderChildern in will update");    
    if (!children) return;
    if(nextProps){
      nextProps.layersList.map(layerObj => {     
        this.map.addLayer(layerObj.layer);     
      });
  
      nextProps.overlayList.map(tempOverlayObj => {
        this.map.addOverlay(tempOverlayObj.overlay);
      });
  
      nextProps.controlsList.map(tempControlObj => {
        this.map.addControl(tempControlObj.control);
      });
  
      // console.log(nextProps);
  
      nextProps.interactionsList.map(tempInteractionObj => {
        this.map.addInteraction(tempInteractionObj.interaction);
      });
    }
   
   

    var myExtent = [-7962402.123928489, 5119783.229904961, -7925572.050268343, 5143569.319143806];
    this.map.getView().fit(myExtent, this.map.getSize());
  }

  render() {
    console.log('MapComp Render');
    return (
      <div id="map" ref={(el) => this.mapDiv = el} className="mapComp">
        {this.props.children}
        <HeaderContainer showPopup={this.showSearchDetailPopup.bind(this)} interactionsList={this.props.interactionsList} layersList={this.props.layersList} searchFeatures={this.props.searchfeatures} addSearchFeatures={this.props.actions.addSearchFeatures} selectedTool={this.props.selectedTool} addSelectedTool={this.props.actions.addSelectedTool} />
      </div>
    );
  }

  componentWillUnmount() {
    // this.map.setTarget(undefined)
  }


}


export default Map;