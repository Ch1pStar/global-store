import {get, initDebug} from './util'
import middleware from './middleware/index'
import reducer from './reducers/index'
import View from './View';
import {INIT} from './actions/index';

function loaded (data) {
  const store = window.Redux.createStore(reducer, data, middleware)
  const view = new View(data, store);

  initDebug(data, store);

  store.dispatch({type: INIT});
}

document.addEventListener('DOMContentLoaded', () => get(loaded))