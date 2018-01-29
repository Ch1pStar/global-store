import timeController from './TimerController';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;
// export default composeEnhancers(Redux.applyMiddleware(timeController));


export default Redux.applyMiddleware(timeController);