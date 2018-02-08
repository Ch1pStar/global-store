import {get, initDebug} from './util'
import middleware from './middleware/index'
import reducer from './reducers/index'
import View from './View'
import {INIT} from './actions/index'

function loaded (data) {
  const store = window.Redux.createStore(reducer, data, middleware) // create store
  const view = new View(data, store) // create view

  initDebug(data, store)

  // start the app
  store.dispatch({type: INIT})
}

document.addEventListener('DOMContentLoaded', () => get(loaded))
