import {get, goHot, clearLocalState} from './util'
import middleware from './middleware/index'
import reducer from './reducers/index'

import {createUpdateFromStringAction} from './actions/update'
import createView from './view';

function loaded (data) {
  const store = window.Redux.createStore(reducer, data, middleware)

  initDebug(data, store);
  createView(data, store);

  store.dispatch({type: 'init'});
}

function initDebug(data, store) {
  const debug = document.querySelector('.debug-text')
  const btn = document.querySelector('.debug-update')
  const updateFromString = createUpdateFromStringAction(store)
  const clearCacheBtn = document.querySelector('.debug-clear-cache')

  debug.value = JSON.stringify({success: true, result: data})
  debug.addEventListener('paste', (e) => updateFromString(e.clipboardData.getData('Text')))

  btn.addEventListener('click', () => updateFromString(debug.value))
  clearCacheBtn.addEventListener('click', clearLocalState)
}

document.addEventListener('DOMContentLoaded', () => get(loaded))