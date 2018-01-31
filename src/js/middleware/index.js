import stateController from './StateController'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || window.Redux.compose

export default composeEnhancers(window.Redux.applyMiddleware(stateController))
