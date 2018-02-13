import * as PIXI from 'pixi.js'

const HOUR = 3600000
const MINUTE = 60000
const SECOND = 1000

export default class Timer extends PIXI.Container {

  constructor (state) {
    super();
    this._state = state

    const text = new PIXI.Text('lel', {fill: 0xffffff, fontSize: 16});

    this.addChild(text);
    this._title = text;
  }

  render () {
    this.dirty = false
  }

  set state (val) {
    const state = val
    const hot = state.isHot
    const tillStart = state.timeToStart
    const total = state.timeLeft
    const text = (tillStart < 0) ? `Ends in: ${this._formatRemaining(total)}` : `Starts in: ${this._formatRemaining(tillStart)}`;

    this._title.text = text;

    this._title.style.fill = val.isHot ? 0xff77aa : 0xffffff;
    this._state = state
    this.dirty = true
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
