import React, { Component } from "react";
import { Util } from './Util';
import Map from './MapComponent';
import Layers from './Layers/LayersContainer';
import TileLayer from './Layers/TileLayer';
import VectorLayer from './Layers/VectorLayer';
import Controls from './Controls/ControlsContainer';
import OverviewMap from '../components/Controls/OverviewMap';
import BasemapSwitcher from '../components/Controls/BasemapSwitcher'
import HeaderContainer from './Header/HeaderContainer'
import Overlays from '../components/Overlays/OverlaysContainer'
import Overlay from '../components/Overlays/Overlay'
import actions from '../redux/actions'
import { bindActionCreators } from 'redux'
import axios from 'axios'
import { connect } from 'react-redux'
import PopupElementIdentify from "./Overlays/PopupElementIdentify";
// import { bindActionCreators } from "../../../../AppData/Local/Microsoft/TypeScript/2.6/node_modules/redux";

var serviceUrl = 'http://gisdemo1.cdmsmith.com/arcgis/rest/services/EastProvidence_Operational/MapServer/';
class MapContainer extends Component {

    constructor(props) {
        super(props);
        console.log("MapContainer Constructor");
        this.state = {
            tenantData: {}
        }
    }

    componentDidMount() {
        console.log("MapContainer did mount");
        this.requestApi();
    }


    requestApi() {
        console.log("Connecting to NGEM server and Fetch tenant Data");
        // axios.get('http://dl-cs4nbh2.cdminc.internal.cdm.com:3000/NGEM')
        var tenantId = "H1y3s1s1M";
        axios.get('http://localhost:5000/NGEM/' + tenantId)
            .then(response => {
                this.setState({ tenantData: response.data });
            })
            .catch(e => {
                console.log("Failed to Connecting to NGEM server and Fetch tenant Data");
                console.log(e)
            })

    }

    renderLayer() {
        console.log("MapContainer Render Layer");
        if ((!(jQuery.isEmptyObject(this.state.tenantData)))) {
            console.log("Map Layer Rendering");            
            var baseMaps, baseLayers, mapLayers, vectorLayers = [];
            
            baseMaps = this.state.tenantData.basemaps;
            baseLayers = this.state.tenantData.basemapLayers;
            //Load only parcel vector layers
            var parcelLayerID = "SJv7fGRq1f";            
            vectorLayers.push(this.state.tenantData.layers.find(function (layer) { return layer.layerId === parcelLayerID }));            
            mapLayers = [...baseLayers, ...vectorLayers];
            
            return (

                mapLayers.map(mapLayer => {
                    if (mapLayer.type == "tile") {                       
                        var basemapLayer = baseMaps.find(function (layer) { return layer.layerId === mapLayer.layerId });                        
                        mapLayer.title = basemapLayer.name;
                        return (<TileLayer key={basemapLayer.layerId} options={mapLayer} addLayer={this.props.actions.addLayer} />);
                    }
                    else {
                        return (<VectorLayer key={mapLayer.layerId} options={mapLayer} addLayer={this.props.actions.addLayer} />)
                    }
                })
           )
          
        }

    }

    renderControl() {
        console.log("MapContainer Render Controls");
        if ((!(jQuery.isEmptyObject(this.state.tenantData)))) {
            console.log("Map Controls Rendering");            
            var controlList = [];
            controlList = this.state.tenantData.controls;
            return (controlList.map(tempCtrl => {
                if (tempCtrl == "OverviewMap") {
                    return (<OverviewMap key={tempCtrl} addControl={this.props.actions.addControl} />)
                }
                else {
                    return (<BasemapSwitcher key={tempCtrl} addControl={this.props.actions.addControl} />)
                }
            }))
        }
    }
  
    render() {

        console.log("Map Container render");

        return (
            <div>
                <Map {...this.props}>
                    <Layers>
                        {this.renderLayer()}
                    </Layers>
                    <Controls>
                        {this.renderControl()}
                    </Controls>
                    <Overlays>
                        <Overlay addOverlay={this.props.actions.addOverlay}>
                            <PopupElementIdentify selectedTool={this.props.selectedTool} interactionsList={this.props.interactionsList} featureData={this.props.featureData} identifyFeatureData={this.props.identifyFeatureData} addPopup={this.props.actions.addPopup}  addIdentifyFeatures={this.props.actions.addIdentifyFeatures}/>
                        </Overlay>
                    </Overlays>
                    
                </Map>


            </div>
        )



    }
}

function mapStateToProps(state) {
    return {
        //state
        // <MapComp addSelectedTool={this.props.actions.addSelectedTool} addIdentifyFeatures={this.props.actions.addIdentifyFeatures} addInteraction={this.props.actions.addInteraction} addCurrentFeature={this.props.actions.addCurrentFeature} addFeatureData={this.props.actions.addFeatureData} interactionsList={this.props.interactionsList} layersList={this.props.layersList} feature={this.props.currentFeatureObj} overlayList={this.props.overlayList} controlsList={this.props.controlsList} selectedTool={this.props.selectedTool}>
        layersList: state.layersList,
        overlayList: state.overlayList,
        controlsList: state.controlsList,
        currentFeatureObj: state.feature,
        featureData: state.featureData,
        interactionsList: state.interactionsList,
        selectedTool: state.selectedTool,
        identifyFeatureData: state.identifyFeatureData
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);