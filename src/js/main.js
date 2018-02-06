import {get, goHot, clearLocalState} from './util'
import middleware from './middleware/index'
import reducer from './reducers/index'

import {createUpdateFromStringAction} from './actions/update'

// ----------------------INIT----------------------------

const store = window.Redux.createStore(reducer, middleware)

window.goHot = goHot
document.addEventListener('DOMContentLoaded', () => get(loaded))

function loaded (data) {
  const tournaments = data

  const debug = document.querySelector('.debug-text')
  const btn = document.querySelector('.debug-update')
  const updateFromString = createUpdateFromStringAction(store)
  const clearCacheBtn = document.querySelector('.debug-clear-cache');

  debug.value = JSON.stringify({success: true, result: data})
  debug.addEventListener('paste', (e) => updateFromString(e.clipboardData.getData('Text')))

  btn.addEventListener('click', () => updateFromString(debug.value))
  clearCacheBtn.addEventListener('click', clearLocalState)

  window.store = store
  store.dispatch({type: 'init', state: tournaments, store})
}
