import {get, initDebug} from './util'
import middleware from './middleware/index'
import reducer from './reducers/index'

import createView from './view';

function loaded (data) {
  const store = window.Redux.createStore(reducer, data, middleware)

  initDebug(data, store);
  createView(data, store);

  store.dispatch({type: 'init'});
}

document.addEventListener('DOMContentLoaded', () => get(loaded))