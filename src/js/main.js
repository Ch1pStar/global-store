import {get, initDebug} from './util'
import middleware from './middleware/index'
import reducer from './reducers/index'
import View from './view';

function loaded (data) {
  const store = window.Redux.createStore(reducer, data, middleware)
  const view = new View(data, store);

  initDebug(data, store);

  store.dispatch({type: 'init'});
}

document.addEventListener('DOMContentLoaded', () => get(loaded))