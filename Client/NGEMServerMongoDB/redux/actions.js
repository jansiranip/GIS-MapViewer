
let actions={
    addLayer: function(layer){
        return{
            type:'ADD_LAYER',
            layer:layer
        }
    },

    addOverlay:function(overlay){
        return{
            type:'ADD_OVERLAY',
            overlay:overlay
        }
    },

    addControl:function(control){
        return{
            type:'ADD_CONTROL',
            control:control
        }
    },
    addInteraction:function(interaction){
        return{
            type:'ADD_INTERACTION',
            interaction:interaction
        }
    },
    addCurrentFeature:function(feature){
        return{
            type:'ADD_FEATURE',
            feature:feature
        }
    },
 
    addFeatureData:function(featureData){
        return{
            type:'ADD_FEATURE_DATA',
            featureData:featureData
        }
    },
    addSelectedTool:function(selectedTool){
        return{
            type:'ADD_SELECTED_TOOL',
            selectedTool:selectedTool
        }
    },
    addIdentifyFeatures:function(identifyFeatureData){
        return{
            type:'ADD_IDENTIFY_FEATURES',
            identifyFeatureData:identifyFeatureData
        }
    }
   
    
   
}

export default actions;