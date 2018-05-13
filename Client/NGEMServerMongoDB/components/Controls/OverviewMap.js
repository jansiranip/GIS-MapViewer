import React, { Component } from 'react'
import Util from '../Util'
import actions from '../../redux/actions'


class OverviewMap extends Component {
    constructor(props, context) {
        super(props, context);
        console.log("Overview Map Constructor");
        this.options = {
            collapsed: undefined,
            collapseLabel: undefined,
            collapsible: undefined,
            label: undefined,
            layers: undefined,
            render: undefined,
            target: undefined,
            tipLabel: undefined,
            view: undefined
        };
        this.control = new ol.control.OverviewMap;
        this.events = {
            'change': undefined,
            'propertychange': undefined
        };
        this.Util = new Util();
    }


    render() {
        return null;
    }
    componentDidMount() {
        var options = this.Util.getOptions(Object['assign'](this.options, this.props));
        this.control = new ol.control.OverviewMap(options);
      //  this.props.mapComp.controls.push(this.control)

        let olEvents = this.Util.getEvents(this.events, this.props);
        for (let eventName in olEvents) {
            this.control.on(eventName, olEvents[eventName]);
        }

        this.props.addControl(this.control);
    }

}




export default OverviewMap;