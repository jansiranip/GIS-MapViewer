import React, { Component } from 'react'
class CheckBoxComp extends Component {
    constructor(props) {
        super(props);     
        console.log("Checkbox Constructor");            
        this.state = {
            isChecked: true
        }

    }
    handleChange(evt) {
        this.setState({
            isChecked: !this.state.isChecked
        });     
       let layerListArr=[];       
       this.props.layersList.map(layer =>{
        layerListArr.push(layer.layer);
      }
    );
       
        layerListArr.forEach(function (layer) {          
            if (layer.get("title") == evt.target.value) {       
                if(layer.get("title")=="Sewer_Structure"){
                    var layerSrc=layer.get("source");                  
                    var paramsVal=layerSrc.getParams();
                    if(!evt.target.checked){
                    paramsVal.LAYERS='show:0,2';                   
                    }
                    else{
                        paramsVal.LAYERS='show:0,2,4,6,8,10,12,13,14,27,28,29,30,31,32,34,35,36,37,39,44,50,51';
                    }
                    layerSrc.updateParams(paramsVal);
                }
                else
                layer.setVisible(evt.target.checked);
            }
        }
        ) 

    };
    render() {
        return (
            <input type="checkbox" checked={this.state.isChecked} onChange={this.handleChange.bind(this)} value={this.props.val} />
        )
    }
}


class LayersList extends Component {
    constructor(props) {
        super(props);
        console.log("LayersList Items Constructor");
        
    }


    render() {
        const layersList=this.props.layersList;      
        const content = (
            this.props.layersList.map(function (layerObj, index) {                
                return <li key={index} className="listItem" >
                    <CheckBoxComp val={layerObj.layer.get("title")} layersList={layersList} />
                    <label>&nbsp;{layerObj.layer.get("title")}</label>
                </li>
            })
        );

        return (
            <div>
                <ul className="dropdown-menu">
                    {content}
                </ul>
            </div>
        );
    }
}

export default LayersList;