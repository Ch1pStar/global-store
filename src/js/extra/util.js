import {createUpdateFromStringAction} from '../actions/update'

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
  if (!window.location.search) return

  const exp = new RegExp(`[?&]${val}(=([^&#]*)|&|#|$)`)

  return exp.exec(window.location.search)[2]
}

/* eslint-disable */
function createThunkAction (type, fn) {
  return (action, dispatch, getState) => {
    fn(action.payload, dispatch, getState)
  }
}

function createAsyncAction (type, fn) {
  return createThunkAction(type, (payload, dispatch, getState) => {
    dispatch({type: type + '_START', payload: payload})
    fn(payload, (error, result) => {
      if (typeof error === 'undefined') error = null
      if (typeof result === 'undefined') result = null
      return dispatch({type: type + '_END', payload: {error, result}, payloadStart: payload})
    }, dispatch, getState)
  })
}

function createServerAction (type, options) {
  let {url, request, response, validate, callback} = (options || {})
  return createAsyncAction(type, (data, cb, dispatch) => {
    let requestData = data
    let urlRequest = (typeof url === 'function') ? url(data) : url
    if (request) data = request(data)
    if (validate) {
      let error = validate(data)
      if (error) {
        if (typeof callback === 'function') callback(error, null, null, requestData, dispatch)
        return cb(error)
      }
    }
    Server.request(urlRequest, data, (error, result) => {
      if (response) result = response(result)
      if (error) {
        if (typeof callback === 'function') callback(error, result)
        return cb(error, result, requestData, dispatch)
      }
      let data = {result, entities: {}}
      if (result && normalizeConfig) {
        data = normalize(result, normalizeConfig)
        dispatch('REPOSITORY_LOAD_DATA', {data})
      }
      if (typeof callback === 'function') callback(error, data.result, data.entities, requestData, dispatch)
      cb(error, data.result)
    })
  })
}

function createAction (type, config) {
  if (config.type === 'async') {
    if (!config.fn) console.error('Action defined as async without a fn.', config)
    return createAsyncAction(type, config.fn || ((payload, callback) => callback()))
  } else if (config.type === 'server') {
    if (!config.url) console.error('Action defined as server without a url.', config)
    return createServerAction(type, config)
  } else {
    if (!config.fn) console.error('Action defined as thunk without a fn.', config)
    return createThunkAction(type, config.fn)
  }
}
/* eslint-enable */
