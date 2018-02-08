import {createUpdateFromStringAction} from './actions/update'

export function get (callback, url = 'src/mock/settings.json') { window.fetch(url).then((res) => res.json()).then((data) => callback(data.result)) }

export function goHot () {
  get((state) => {
    window.store.dispatch({type: 'update', state})
  }, 'src/mock/hot.json')
}

export function clearLocalState () {
  window.localStorage.setItem('viewed-tournaments', '[]')
}

export function currentTime() {
	return window.performance.now() << 0
}

export function initDebug(data, store) {
  const debug = document.querySelector('.debug-text')
  const btn = document.querySelector('.debug-update')
  const updateFromString = createUpdateFromStringAction(store)
  const clearCacheBtn = document.querySelector('.debug-clear-cache')

  debug.value = JSON.stringify({success: true, result: data})
  debug.addEventListener('paste', (e) => updateFromString(e.clipboardData.getData('Text')))

  btn.addEventListener('click', () => updateFromString(debug.value))
  clearCacheBtn.addEventListener('click', clearLocalState)
}

export function queryParam(val) {
	const exp = new RegExp(`[?&]${val}(=([^&#]*)|&|#|$)`);

	return exp.exec(window.location.search)[2];
}
