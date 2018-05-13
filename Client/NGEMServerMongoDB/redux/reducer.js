
export default function reducer(state,action){
    switch(action.type){
        case 'ADD_LAYER':
            return Object.assign({},state,{
                layersList:[{
                    layer:action.layer
                    //id:getId(state)
                },...state.layersList]
            })          

        case 'ADD_OVERLAY':
            return Object.assign({},state,{
                overlayList:[{
                    overlay:action.overlay},
                    ...state.overlayList]
            })

        case 'ADD_CONTROL':
            return Object.assign({},state,{
                controlsList:[{
                    control:action.control                   
                },...state.controlsList]
            })     
        case 'ADD_INTERACTION':
            return Object.assign({},state,{
                interactionsList:[{
                    interaction:action.interaction                    
                },...state.interactionsList]
            })            

        case 'ADD_FEATURE':
            return Object.assign({},state,{
                feature:action.feature
                }
            )
       
        case 'ADD_FEATURE_DATA':
            return Object.assign({},state,{
                featureData:action.featureData
            })
        
        case 'ADD_SELECTED_TOOL':
            return Object.assign({},state,{
                selectedTool:action.selectedTool
            })
        case 'ADD_IDENTIFY_FEATURES':
            return Object.assign({},state,{
                identifyFeatureData:action.identifyFeatureData
            })
        default:
            return state;
    }
}