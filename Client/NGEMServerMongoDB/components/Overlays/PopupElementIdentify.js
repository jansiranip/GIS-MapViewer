import React, { Component } from 'react'


class PopupElementIdentify extends Component {
    constructor(props) {
        super(props);
        console.log("Popup Constructor");
        this.containerEnt = HTMLElement;
        this.contentEnt = HTMLElement;
        this.contentCloseEnt = HTMLElement;
        this.contentVal = HTMLElement;


        this.state = {
            layerName: "",
            currentFeatureData: {},
            canShowOverlay: true,
            identifyFeatures: {},
            parcelFeatures: {},
            parcelContent: "",
            identifyContent: "",
            
        };
        console.log(this.state.canShowOverlay);
        this.currentFeatureData1 = {};
        this.currentIdentifyCount=0;
    }

    componentDidMount() {
        console.log("Popup Did mount");
        this.contentCloseEnt.addEventListener("click", () => {
            this.containerEnt.style.display = 'none';
            var selectInteraction;
            this.props.interactionsList.map(interactionObj => {
                if (interactionObj.interaction instanceof ol.interaction.Select)
                    selectInteraction = interactionObj.interaction;
            });
            selectInteraction.getFeatures().clear();
            if(this.props.selectedTool=="Identify"){
                this.props.addIdentifyFeatures({});
            }
           
        });

        // if (this.props.selectedTool == "Identify") {
        this.buttonNext.addEventListener("click", () => {
            this.identifyDetail("Next");
        });
        this.buttonPrevious.addEventListener("click", () => {

            this.identifyDetail("Prev");
        });
        //  }
        //  else {
        this.buttonOwner.addEventListener("click", () => {
            this.parcelDetail("0");
        });
        this.buttonAssessment.addEventListener("click", () => {

            this.parcelDetail("1");
        });
        this.buttonSales.addEventListener("click", () => {

            this.parcelDetail("2");
        });
        this.buttonLinks.addEventListener("click", () => {

            this.parcelDetail("3");
        });
        // }


    }

    identifyDetail(selectedOption) {
        var totCount = this.state.identifyFeatures.length;
        console.log(totCount);
       
        console.log(selectedOption);
        if (selectedOption == "Next") {
           // if(count==-1){
            if(this.currentIdentifyCount<totCount)
                this.currentIdentifyCount++;
                var count = this.currentIdentifyCount;
            //}
            if (count < totCount) {
                var res = this.state.identifyFeatures[count];
                var headerValue = res.displayFieldName + " - " + res.value;
                this.setState({
                    layerName: headerValue
                });
                this.setState({
                    identifyContent: this.displayIdentifyContent(count)
                });
                /* this.setState({
                    identifyContent: this.displayIdentifyContent(count)
                }, function () {
                    this.currentIdentifyCount++;
                }.bind(this)); */

            }
           
        }
        else if (selectedOption == "Prev") {
            console.log(this.currentIdentifyCount);
            
            //if(this.currentIdentifyCount==totCount){
                if(this.currentIdentifyCount!=0)
                this.currentIdentifyCount--;
           // }
           //if()
            var count = this.currentIdentifyCount;
            console.log(count);
            if(count>=0){
                var res = this.state.identifyFeatures[count];
                var headerValue = res.displayFieldName + " - " + res.value;
                this.setState({
                    layerName: headerValue
                });
                this.setState({
                    identifyContent: this.displayIdentifyContent(count)
                });

            }
        }



    }

    selectFirstIdentifyFeature(tempIdFeature) {
        console.log(tempIdFeature.geometryType);
        var identifyFeature;
        if (tempIdFeature.geometryType == "esriGeometryPolygon") {
            console.log(tempIdFeature.geometryType);
            identifyFeature = new ol.Feature({
                geometry: new ol.geom.Polygon(tempIdFeature.geometry.rings),
                name: tempIdFeature.value
            });
        }
        else if (tempIdFeature.geometryType == "esriGeometryPolyline") {
            console.log(tempIdFeature.geometryType);
            identifyFeature = new ol.Feature({
                geometry: new ol.geom.MultiLineString(tempIdFeature.geometry.paths),
                name: tempIdFeature.value
            });
        }
        else if (tempIdFeature.geometryType == "esriGeometryPoint") {
            console.log(tempIdFeature.geometryType);
            identifyFeature = new ol.Feature({
                geometry: new ol.geom.Point(tempIdFeature.geometry.x, tempIdFeature.geometry.y),
                name: tempIdFeature.value
            });
        }
        console.log(identifyFeature);
        return identifyFeature;

    }
    componentWillReceiveProps(nextProps) {
        console.log("Popup ele nextProps");
        if (!(_.isEqual(nextProps, this.props))) {
            console.log("props not equal");

        }
        //IDENTIFY FEATURES
        console.log(nextProps.selectedTool);
        console.log(this.props.selectedTool);
        if (nextProps.selectedTool == "Identify") {
            console.log(nextProps.identifyFeatureData);
            if (!(jQuery.isEmptyObject(nextProps.identifyFeatureData))) {
                console.log(nextProps.identifyFeatureData.data.results);
                var res = nextProps.identifyFeatureData.data.results[0];
                var headerValue = res.displayFieldName + " - " + res.value;
                this.setState({
                    layerName: headerValue
                });
                var identifyFeature;
                var tempIdFeature = nextProps.identifyFeatureData.data.results[0];

                //Select interaction based on geometry type
                identifyFeature = this.selectFirstIdentifyFeature(tempIdFeature);
                var selectInteraction;


                nextProps.interactionsList.map(interactionObj => {
                    if (interactionObj.interaction instanceof ol.interaction.Select)
                        selectInteraction = interactionObj.interaction;
                });
                selectInteraction.getFeatures().push(identifyFeature);

                console.log(selectInteraction.getFeatures());
                console.log("this.currentIdentifyCount");
                console.log(this.currentIdentifyCount);
                this.setState({
                    identifyFeatures: nextProps.identifyFeatureData.data.results
                }, function () {
                    this.setState({
                        identifyContent: this.displayIdentifyContent(0)
                    });
                    //this.currentIdentifyCount++;
                }.bind(this));
                console.log(this.currentIdentifyCount);
                console.log(this.state.identifyFeatures);


                this.containerEnt.style.display = 'block';
            }
            else {
                console.log(this.containerEnt.style.display);
                var selectInteraction;
                this.props.interactionsList.map(interactionObj => {
                    if (interactionObj.interaction instanceof ol.interaction.Select)
                        selectInteraction = interactionObj.interaction;
                });
                selectInteraction.getFeatures().clear();
                console.log(nextProps.featureData);

            }

        }
        else if (nextProps.selectedTool == "Parcel") {
            console.log(nextProps.featureData);
            //console.log(this.props.featureData);
            if (!(jQuery.isEmptyObject(nextProps.featureData))) {
                this.containerEnt.style.display = 'block';
                var parcelValue = "Parcel-ID: " + nextProps.featureData.currentFeatureDetail.get("Parcel_ID");
                this.setState({
                    layerName: parcelValue
                });
                this.setState({
                    parcelFeatures: nextProps.featureData
                }, function () {
                    this.setState({
                        parcelContent: this.displayParcelContent("0")
                    });

                }.bind(this));
                console.log(this.state.parcelFeatures);
            }
        }

    }

    displayIdentifyContent(selectedOption) {
        console.log("Identify Details");
        console.log(selectedOption);
        console.log(this.state.identifyFeatures);
        var tempIdentifyData = this.state.identifyFeatures[selectedOption];

        if (!(jQuery.isEmptyObject(tempIdentifyData))) {
            this.buttonOwner.style.display="none";
            this.buttonAssessment.style.display="none";
            this.buttonSales.style.display="none";
            this.buttonLinks.style.display="none";
            this.buttonPrevious.style.display="block";
            this.buttonNext.style.display="block";
            //this.currentIdentifyCount++;
            if (tempIdentifyData.layerId == 0) {
                var ST_NUM = tempIdentifyData.attributes.ST_NUM;
                var Shape_Area = tempIdentifyData.attributes.Shape_Area;
                var Shape_Length = tempIdentifyData.attributes.Shape_Length;
                var REM_GIS_ID = tempIdentifyData.attributes.REM_GIS_ID;


                return (

                    <tbody>
                        <tr>
                            <td>ST_NUM:</td>
                            <td>{ST_NUM}</td>
                        </tr>
                        <tr>
                            <td>Shape_Area:</td>
                            <td>{Shape_Area}</td>
                        </tr>
                        <tr>
                            <td>Shape_Length:</td>
                            <td>{Shape_Length}</td>
                        </tr>
                        <tr>
                            <td>REM_GIS_ID:</td>
                            <td>{REM_GIS_ID}</td>
                        </tr>

                    </tbody>
                )

            }
            else if (tempIdentifyData.layerId == 32 || tempIdentifyData.layerId == 28) {
                var street = tempIdentifyData.attributes.US_STREET;
                var US_NGVD = tempIdentifyData.attributes.US_NGVD;
                var US_MHW = tempIdentifyData.attributes.US_MHW;
                var STATUS = tempIdentifyData.attributes.STATUS;
                var MATERIAL = tempIdentifyData.attributes.MATERIAL;

                return (

                    <tbody>
                        <tr>
                            <td>US_STREET:</td>
                            <td>{street}</td>
                        </tr>
                        <tr>
                            <td>US_NGVD:</td>
                            <td>{US_NGVD}</td>
                        </tr>
                        <tr>
                            <td>US_MHW:</td>
                            <td>{US_MHW}</td>
                        </tr>
                        <tr>
                            <td>STATUS:</td>
                            <td>{STATUS}</td>
                        </tr>
                        <tr>
                            <td>MATERIAL:</td>
                            <td>{MATERIAL}</td>
                        </tr>
                    </tbody>
                )
            }
            else if(tempIdentifyData.layerId == 27 || tempIdentifyData.layerId == 30){
                var street = tempIdentifyData.attributes.STREET;
                var OWNERSHIP = tempIdentifyData.attributes.OWNERSHIP;
                var SYSTEM = tempIdentifyData.attributes.SYSTEM;
                var BOT_MHW = tempIdentifyData.attributes.BOT_MHW;
                var BOT_NGVD = tempIdentifyData.attributes.BOT_NGVD;

                return (

                    <tbody>
                        <tr>
                            <td>STREET:</td>
                            <td>{street}</td>
                        </tr>
                        <tr>
                            <td>OWNERSHIP:</td>
                            <td>{OWNERSHIP}</td>
                        </tr>
                        <tr>
                            <td>SYSTEM:</td>
                            <td>{SYSTEM}</td>
                        </tr>
                        <tr>
                            <td>BOT_MHW:</td>
                            <td>{BOT_MHW}</td>
                        </tr>
                        <tr>
                            <td>BOT_NGVD:</td>
                            <td>{BOT_NGVD}</td>
                        </tr>
                    </tbody>
                )
            }


        }
    }
    displayParcelContent(selectedOption) {
        console.log("parcel Details");
        console.log(selectedOption);
        console.log(this.state.parcelFeatures);
        var tempFeatureData = this.state.parcelFeatures.currentFeatureDetail;
        var parcelID, land_val, acres, total_val, land_use_desc, living_area, sale_date, sale_price;

        if (!(jQuery.isEmptyObject(tempFeatureData))) {
            this.buttonPrevious.style.display="none";
            this.buttonNext.style.display="none";
            this.buttonOwner.style.display="block";
            this.buttonAssessment.style.display="block";
            this.buttonSales.style.display="block";
            this.buttonLinks.style.display="block";

            parcelID = tempFeatureData.get("Parcel_ID");
            var location = tempFeatureData.get("LOCATION");
            var owner = tempFeatureData.get("SLH_OWN_NAME");
            var co_owner = tempFeatureData.get("SLH_CO_OWN_NAME");
            var own_addr = tempFeatureData.get("SLH_OWN_ADDR");
            var city = tempFeatureData.get("SLH_CITY");
            var stt = tempFeatureData.get("SLH_STT");
            var zip = tempFeatureData.get("SLH_ZIP");
            land_val = tempFeatureData.get("LANDVAL");
            total_val = tempFeatureData.get("TOTVAL");
            land_use_desc = tempFeatureData.get("LND_USE_DESC");
            living_area = tempFeatureData.get("LIVING_AREA");
            acres = tempFeatureData.get("PRC_TTL_LND_AREA_ACRES");
            sale_date = tempFeatureData.get("SLH_SALE_DATE");
            sale_price = tempFeatureData.get("SLH_PRICE");
            // console.log(this.props.currentFeaturePhoto);
            // console.log(parcelID);
            if (selectedOption == "0") {
                return (
                    <tbody>
                        <tr>
                            <td>LOCATION:</td>
                            <td>{location}</td>
                        </tr>
                        <tr>
                            <td>OWNER:</td>
                            <td>{owner}</td>
                        </tr>
                        <tr>
                            <td>CO-OWNER:</td>
                            <td>{co_owner}</td>
                        </tr>
                        <tr>
                            <td>SLH_OWN_ADDR:</td>
                            <td>{own_addr}</td>
                        </tr>
                        <tr>
                            <td>SLH_CITY:</td>
                            <td>{city}</td>
                        </tr>
                        <tr>
                            <td>SLH_STT:</td>
                            <td>{stt}</td>
                        </tr>
                        <tr>
                            <td>SLH_ZIP:</td>
                            <td>{zip}</td>
                        </tr>
                    </tbody>
                );
            }
            else if (selectedOption == "1") {
                return (
                    <tbody>
                        <tr>
                            <td>ACRES:</td>
                            <td>{acres}</td>
                        </tr>
                        <tr>
                            <td>LAND_VAL:</td>
                            <td>{land_val}</td>
                        </tr>
                        <tr>
                            <td>TOTAL_VAL:</td>
                            <td>{total_val}</td>
                        </tr>
                        <tr>
                            <td>LAND USE DESC:</td>
                            <td>{land_use_desc}</td>
                        </tr>
                        <tr>
                            <td>LIVING AREA:</td>
                            <td>{living_area}</td>
                        </tr>

                    </tbody>
                );
            }
            else if (selectedOption == "2") {
                return (
                    <tbody>
                        <tr>
                            <td>SALE_DATE:</td>
                            <td>{acres}</td>
                        </tr>
                        <tr>
                            <td>SALE_PRICE:</td>
                            <td>{land_val}</td>
                        </tr>
                    </tbody>
                );
            }
            else if (selectedOption == "3") {
                var photolink = this.state.parcelFeatures.currentFeaturePhoto.Photolink;
                var link = '"' + photolink + '"';
                return (
                    <tbody>
                        <tr>
                            <td>REAL PROPERTY SEARCH:</td>
                            <td>{acres}</td>
                        </tr>
                        <tr>
                            <td>GOOGLE:</td>
                            <td>{land_val}</td>
                        </tr>
                        <tr>
                            <td>BING:</td>
                            <td>{total_val}</td>
                        </tr>
                        <tr>
                            <td>BUILDING ZONING REPORTS:</td>
                            <td>{land_use_desc}</td>
                        </tr>
                        <tr>
                            <td>SEWER INSPECTION REPORTS:</td>
                            <td>{living_area}</td>
                        </tr>
                        <tr>
                            <td>WATER TIECARDS SCANS:</td>
                            <td><a href={link}>{this.state.parcelFeatures.currentFeaturePhoto.Photo}</a></td>
                        </tr>

                    </tbody>
                );

            }
        }

    }

    parcelDetail(selectedOption) {
        // console.log(this);
        this.setState({
            parcelContent: this.displayParcelContent(selectedOption)
        })

    };

    renderButtons() {

        return (
            <tr>
                <td><button ref={el => this.buttonPrevious = el}>Prev</button> </td>
                <td><button ref={el => this.buttonNext = el}>Next</button> </td>
                <td><button ref={el => this.buttonOwner = el}>OWNER</button> </td>
                <td><button ref={el => this.buttonAssessment = el}>ASSESSMENT</button> </td>
                <td><button ref={el => this.buttonSales = el}>SALES</button></td>
                <td><button ref={el => this.buttonLinks = el} >LINKS</button></td>
            </tr>

        )
      



    }
    renderData() {
        console.log(this.state.identifyContent);
        //console.log(this.state.identifyFeatures);
        //console.log(this.props.selectedTool);
        if (this.props.selectedTool == "Identify") {
            //console.log("Show Identify");
            return (
                <table>

                    {this.state.identifyContent ? this.state.identifyContent : <tr><td>no</td></tr>}
                </table>

            )
        }
        else {
            //console.log("Show parcel");
            return (
                <table>

                    {this.state.parcelContent ? this.state.parcelContent : <tr><td>no</td></tr>}
                </table>

            )
        }

    }

    render() {

        var parcelID;
        //console.log("Render popup identify");
        //console.log(this.props.identifyFeatureData);
        //console.log(this.state.layerName);

        return (


            <div className="olPopup" name="IdentifyPopup" ref={el => this.containerEnt = el}>

                <table className="table table-sm" >
                    <thead className="thead-inverse">
                        <tr style={{ height: 30 + "px" }}>
                            <th>{this.state.layerName}</th>
                            <th>
                                <a href="#" ref={el => this.contentCloseEnt = el}>
                                    <i className="fa fa-window-close" aria-hidden="true"> </i>
                                </a>

                            </th>
                        </tr>
                    </thead>
                </table>
                <div className="olPopupContents">

                    {this.renderData()}



                </div>
                <div className="olPopupButton">
                    <table>
                        <tbody>

                            {this.renderButtons()}

                        </tbody>
                    </table>

                </div>

            </div>


        )
        //}
        // else{
        //     return null;
        // }
    }
    componentWillUnmount(){
        console.log("Unmount");
        this.containerEnt.style.display = 'none';
        var selectInteraction;
        this.props.interactionsList.map(interactionObj => {
            if (interactionObj.interaction instanceof ol.interaction.Select)
                selectInteraction = interactionObj.interaction;
        });
        selectInteraction.getFeatures().clear();
    }
}

export default PopupElementIdentify;