import React from 'react'
import { render } from 'react-dom'
import MapContainer from '../components/MapContainer'
import configureStore from '../redux/store'
import { Provider } from 'react-redux'

let initialState = {
    layersList: [],
    overlayList: [],
    controlsList: [],
    interactionsList: [],
    feature: {},
    featureData: {},
    selectedTool:"",
    identifyFeatureData:{}
}
let store = configureStore(initialState);
//configure and create the store


render(
    <Provider store={store}>
        <MapContainer store={store} />
    </Provider>,
    document.getElementById('AppContainer')
)



