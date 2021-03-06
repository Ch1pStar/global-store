import Component from './Component'

const HOUR = 3600000
const MINUTE = 60000
const SECOND = 1000

export default class Timer extends Component {
  constructor (state, appContainer) {
    super(state, appContainer)
    const inner = this._inner = document.createElement('div')
    const startSpan = this._startSpan = document.createElement('span')
    const endSpan = this._endSpan = document.createElement('span')

    this._container.textContent = '------------TIMER------------'
    this._container.appendChild(inner)

    inner.className = 'component-container inner'
    inner.appendChild(startSpan)
    inner.appendChild(endSpan)
  }

  render () {
    if (!this._inner) return

    const state = this._state
    const hot = state.isHot
    const tillStart = state.timeToStart
    const total = state.timeLeft

    if (hot) {
      if (!this._endSpan.classList.contains('hot')) this._endSpan.classList.add('hot')
    } else {
      if (this._endSpan.classList.contains('hot')) this._endSpan.classList.remove('hot')
    }

    if (tillStart < 0) {
      this._endSpan.style.display = 'inline'
      this._startSpan.style.display = 'none'

      this._endSpan.textContent = `Ends in: ${this._formatRemaining(total)}`
    } else {
      this._endSpan.style.display = 'none'
      this._startSpan.style.display = 'inline'

      this._startSpan.textContent = `Starts in: ${this._formatRemaining(tillStart)}`
    }

    super.render()
  }

  set state (val) {
    this._state = val

    this.dirty = true
    this._container.style.display = val.showCountdown && Boolean(val.timeToStart) ? 'none' : 'flex'
  }

  _formatRemaining (ms) {
    if (ms <= 0) return '-------------DONE-------------------'

    const hours = parseInt(ms / HOUR)
    const minutes = parseInt((ms % HOUR) / MINUTE)
    const seconds = parseInt(((ms % HOUR) % MINUTE) / SECOND)
    const msLeft = ((ms % HOUR) % MINUTE) % SECOND

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(msLeft).padStart(3, '0')}`
  }
}
