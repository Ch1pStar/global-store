import {get, initDebug} from './util'
import middleware from './middleware/index'
import reducer from './reducers/index'
import View from './View'
import {INIT} from './actions/index'
import Timer from './extra/Timer';

function loaded (data) {
  const store = window.Redux.createStore(reducer, data, middleware) // create store
  const view = new View(data, store) // create view
  const timer = new Timer(store);


  initDebug(data, store, {timer})

  // start the app
  store.dispatch({type: INIT})
}

document.addEventListener('DOMContentLoaded', () => get(loaded))
