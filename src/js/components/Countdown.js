import Component from './Component'

export default class Countdown extends Component {
  constructor (state, appContainer) {
    super(state, appContainer)

    this._titleSpan = document.createElement('span')
    this._container.appendChild(this._titleSpan)

    this.dirty = state.time.showCountdown && Boolean(state.time.timeToStart);
  }

  set state(state) {
    this._state = state
    // this component needs to be rendered only if it should be shown
    this.dirty = state.time.showCountdown && Boolean(state.time.timeToStart);

    this._titleSpan.style.display = this.dirty ? 'inline' : 'none';
  }

  render () {
    const span = this._titleSpan
    const state = this._state

    span.textContent = `Starts in(countdown)...${state.time.timeToStart}`;

    super.render()
  }
}
