import {get, goHot} from './util'
import middleware from './middleware/index'
import reducer from './reducers/index'

import {createUpdateFromString} from './actions/update';

// ----------------------INIT----------------------------

var store = window.Redux.createStore(reducer, middleware)
window.goHot = goHot
document.addEventListener('DOMContentLoaded', () => get(loaded))

function loaded (data) {
  const tournaments = data

  const debug = document.querySelector('.debug-text')
  const btn = document.querySelector('.debug-update')
  const updateFromString = createUpdateFromString(store);

  debug.value = JSON.stringify({success: true, result: data})
  debug.addEventListener('paste', (e) => updateFromString(e.clipboardData.getData('Text')))

  btn.addEventListener('click', () => updateFromString(debug.value))

  window.store = store
  store.dispatch({type: 'init', state: tournaments})
}
