import React, { Component } from 'react'
import actions from '../../redux/actions'

class SearchResultsContent extends Component {
    constructor(props) {
        super(props);
        console.log("Search results constructor");
    }


    showSelectedFeature(feature){        
        //console.log(feature);
        
        this.props.showPopup(feature);
       
        
    }

    render() {
        var searchFeatures1 = [];
        var contents = "";
        var self = this;
        if (this.props.searchFeatures) {
            searchFeatures1 = this.props.searchFeatures;
            if (searchFeatures1) {
               // searchFeatures1.map(feature => { console.log(feature) });
                contents = (

                    searchFeatures1.map(function(feature,index) {
                        return (
                           
                            <tr key={index}>
                                <td><a href="#" onClick={()=>self.showSelectedFeature(feature)}>{feature.get("Parcel_ID")}</a></td>
                            </tr>
                        )
                    })

                );
            }
        }


        return (
            <tbody>
                {searchFeatures1 ? contents : (<tr><td>No result</td></tr>)}
            </tbody>
        )
    }

}





class SearchResults extends Component {
    constructor(props) {
        //console.log(props);
        super(props);
        console.log("Search Results control");
        this.state = {
            inputText: "",
            searchFeatures:[]

        }
    }


    searchInput(event) {
        var self = this;
        var serviceUrl = 'http://gisdemo1.cdmsmith.com/arcgis/rest/services/EastProvidence_Operational/MapServer/';
        var whereCondtion = "where=SLH_OWN_NAME LIKE '%" + this.state.inputText + "%'&";
        var esrijsonFormat = new ol.format.EsriJSON();
        
        var url = serviceUrl + 63 + '/query/?f=json&' + whereCondtion +
            'returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields="Parcel_ID"';
        var features = [];
        $.ajax({
            url: url, dataType: 'jsonp', success: function (response) {
                if (response.error) {
                    alert(response.error.message + '\n' +
                        response.error.details.join('\n'));
                } else {
                    
                    features = esrijsonFormat.readFeatures(response);
                    //console.log(features);
                    if (features.length > 0) {
                       // console.log("features exist");                        
                        self.setState({searchFeatures:features});                        
                    }
                    else
                        console.log("No features");
                }
            }
        });
        
    }
    handleTextChange(event) {
        //console.log(event.target);
        this.setState({
            inputText: event.target.value
        })
    }

    closeSideBar(event) {
        this.sideBarContent.style.display = "none";
    }
    openSideBar(event) {
        this.sideBarContent.style.display = "block";
    }


    render() {
        return (
            <div>
                <div style={{ "marginRight": "10px" }}>
                    <a className="nav-link col-sm-1" onClick={this.openSideBar.bind(this)} href="#">
                        <i className="fa fa-search"  />
                    </a>
                   
                </div>
                <div className="w3-sidebar w3-bar-block" style={{ "left": "0px", "marginTop": "10px", "width": "350px", "display": "none" }} id="mySidebar" ref={el => this.sideBarContent = el}>
                    <div className="w3-bar-item w3-large row">
                        <label className="col-sm-10"> Enter Search Input:</label>
                        <a className="col-sm-1" onClick={this.closeSideBar.bind(this)}>
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </a>
                    </div>
                    <div className="w3-bar-item">                    
                        <table>
                        <tbody>
                            <tr>
                                <td>
                                    <input type="text" placeholder="Search"
                                        value={this.state.inputText} onChange={this.handleTextChange.bind(this)} />
                                </td>
                                <td>
                                    <a className="nav-link col-sm-1" onClick={this.searchInput.bind(this)}>
                                        <i className="fa fa-search" style={{ "color": "black" }} />
                                    </a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="w3-bar-item">
                        <label>Search Results</label>
                        <table border="1">
                            <SearchResultsContent searchFeatures={this.state.searchFeatures} showPopup={this.props.showPopup}/>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchResults;