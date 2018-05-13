
import React, { Component } from 'react'
import LayersList from './LayersList'
import SearchResults from './SearchResults'

class HeaderContainer extends Component {
    constructor(props) {
        super(props);
        console.log("HeaderComponent Constructor");
        this.state={canIdentifyShow:false};
                
    }

    enableIdentify(evt){
        console.log("Identify feature");
        //console.log(evt);
        this.props.addSelectedTool("Identify");
        this.setState({
            canIdentifyShow:!this.state.canIdentifyShow
        })

        var selectInteraction;
        this.props.interactionsList.map(interactionObj => {
            if (interactionObj.interaction instanceof ol.interaction.Select)
                selectInteraction = interactionObj.interaction;
        });
        selectInteraction.getFeatures().clear();
        //console.log(selectInteraction.getFeatures());
    }
    disableIdentify(evt){
        console.log("disable identify feature");
        //console.log(evt);
        this.props.addSelectedTool("");
        this.setState({
            canIdentifyShow:!this.state.canIdentifyShow
        })

    }
    render() {

        const appHeaderStyle = {
            height: '50px',
        }
        const lblHeaderStyle = {
            color: 'White',
            textAlign: 'center'
        }

        return (
            <nav className="navbar navbar-fixed-top navbar-dark bg-dark navbar-expand-lg " id="mainNav" style={appHeaderStyle} >
                <div className="container-fluid">
                    <div className="navbar-header">
                        <img src="CDM_Logo.png" />
                        <a className="navbar-brand" style={lblHeaderStyle}>GIS Map Viewer</a>
                    </div>

                    <ul className="nav navbar-nav">
                       
                        { this.state.canIdentifyShow && <li className="nav-item">
                        <div className="nav-link mr-lg-2"  id="printOpt" href="#">
                            <input type="Checkbox" name="disable" onChange={this.disableIdentify.bind(this)} />
                            <label>Disable Identify </label>

                        </div> 

                    </li>}
                        <li className="nav-item">
                            <SearchResults showPopup={this.props.showPopup} addSearchFeatures={this.props.addSearchFeatures} searchFeatures={this.props.searchFeatures}/>
                        </li>
                       
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="toolsDropdown" href="#" data-toggle="dropdown">
                                <i className="fa fa-gavel"></i>
                            </a>
                            <ul className="dropdown-menu" >
                                <li className="nav-item active"><a href="#" onClick={this.enableIdentify.bind(this)}><i className="fa fa-info-circle" /></a></li>

                                <li><a href="#"><i className="fa fa-info-circle" /></a></li>
                                <li><a href="#">   <i className="fa fa-street-view"></i></a></li>
                                <li><a href="#">   <i className="fa fa-crosshairs"></i></a></li>
                                <li><a href="#">   <i className="fa fa-crosshairs"></i></a></li>
                                <li><a href="#">   <i className="fa fa-crosshairs"></i></a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link mr-lg-2" id="getLocationOpt" href="#">
                                <i className="fa fa-crosshairs"></i>


                            </a>

                        </li>
                        <li className="nav-item">
                            <a className="nav-link mr-lg-2" id="printOpt" href="#">
                                <i className="fa fa-print"></i>


                            </a>

                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="lstLayerOpt" href="#" data-toggle="dropdown">
                                <i className="fa fa-server" />
                            </a>

                            <LayersList layersList={this.props.layersList}/>




                        </li>
                        <li className="nav-item">
                            <a className="nav-link mr-lg-2" id="lstQuickmapsOpt" href="#" aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-qrcode" />


                            </a>

                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="shareOpt">
                                <i className="fa fa-share-alt" /></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-target="#" id="helpOpt">
                                <i className="fa fa-question" /></a>
                        </li>
                    </ul>
                </div>
            </nav>

        )
    }
}

export default HeaderContainer;