import { applyMiddleware, compose, createStore} from 'redux'
 import reducer from './reducer'
import logger from 'redux-logger'
//import rootReducer from './reducers'

let finalCreateStore=compose(
    applyMiddleware(logger)
)(createStore)

export default function configureStore(initialState){
    return finalCreateStore(reducer,initialState)
    //return finalCreateStore(rootReducer,initialState)
}