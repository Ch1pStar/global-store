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
