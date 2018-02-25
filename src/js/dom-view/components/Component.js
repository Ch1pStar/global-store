export default class Component {
  // state = null;
  // _container = null;

  constructor (state, appContainer) {
    this._state = state
    this.dirty = true

    const cnt = this._container = document.createElement('div')

    cnt.className = 'component-container component-wrapper'
    appContainer.appendChild(cnt)
  }

  render () {
    this.dirty = false
  }

  set state (val) {
    this._state = val
    this.dirty = true
  }

  clearCnt () {
    this._container.innerText = '--------------------------------'
  }

  set visible (val) {
    this._container.style.display = val ? 'flex' : 'none'
  }

  get visible () {
    return this._container.style.display === 'flex'
  }
}
