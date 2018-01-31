import stateController from './StateController';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;

export default composeEnhancers(Redux.applyMiddleware(stateController));
