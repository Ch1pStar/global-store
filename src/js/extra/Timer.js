import createDispatchTick from '../actions/timeTick'
import {TIME_PRECISION} from './const'
import {currentTime} from './util'

// global time ticker, started on boot up and never stops
export default class Timer {

  constructor(store) {
    this.lastUpdateAt = 0;
    this.paused = false;

    this.tickAction = createDispatchTick(store);

    this.updateTimeBound = this.updateTime.bind(this);

    this.updateTimeBound();
  }

  updateTime () {
    if (this.paused) return
    window.requestAnimationFrame(this.updateTimeBound)

    const current = currentTime()
    const timePassed = current - this.lastUpdateAt
    const shouldUpdate = timePassed >= TIME_PRECISION

    if (shouldUpdate) {
      const mutations = {timePassed}

      this.lastUpdateAt = current
      this.tickAction(mutations)
    }
  }

  stopTime() {
    this.paused = true;
  }

  startTime() {
    this.paused = false;
    this.updateTimeBound();
  }
}