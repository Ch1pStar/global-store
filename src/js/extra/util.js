import {createUpdateFromStringAction} from '../actions/update'
// import {startTime, stopTime} from './middleware/TimerController'

export function get (callback, url = 'src/mock/settings.json') { window.fetch(url).then((res) => res.json()).then((data) => callback(data.result)) }

export function goHot () {
  get((state) => {
    window.store.dispatch({type: 'update', state})
  }, 'src/mock/hot.json')
}

export function clearLocalState () {
  window.localStorage.setItem('viewed-tournaments', '[]')
}

export function currentTime () {
  return window.performance.now() << 0
}

export function initDebug (data, store, {timer}) {
  const debug = document.querySelector('.debug-text')
  const btn = document.querySelector('.debug-update')
  const updateFromString = createUpdateFromStringAction(store)
  const clearCacheBtn = document.querySelector('.debug-clear-cache')

  debug.value = JSON.stringify({success: true, result: data})
  debug.addEventListener('paste', (e) => updateFromString(e.clipboardData.getData('Text')))

  btn.addEventListener('click', () => updateFromString(debug.value))
  clearCacheBtn.addEventListener('click', clearLocalState)

  document.querySelector('.debug-start').addEventListener('click', timer.startTime.bind(timer))
  document.querySelector('.debug-stop').addEventListener('click', timer.stopTime.bind(timer))

  // TODO
  // this._store.addMiddleware(require('redux-immutable-state-invariant')());
  // this._store.addMiddleware(require('redux-logger')({collapsed: true, duration: true}));
  // let matches = window.location.href.match(/[?&]_debug=([^&]+)\b/);
  // let session = (matches && matches.length) ? matches[1] : null;
  // let devTools = null;
  // if (window['devToolsExtension']) devTools = window['devToolsExtension']();
  // if (devTools) this._store.addEnhancer(devTools);
  // if (session) this._store.addEnhancer(require('redux-devtools').persistState(session));
}


export function queryParam (val) {
  const exp = new RegExp(`[?&]${val}(=([^&#]*)|&|#|$)`)

  return exp.exec(window.location.search)[2]
}
