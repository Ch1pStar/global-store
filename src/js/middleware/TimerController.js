import createDispatchTick from '../actions/timeTick'
import {TIME_PRECISION} from '../const';
import {currentTime} from '../util';

const ALLOWED_ACTIONS = ['init']

let prev = 0
let lastUpdateAt = 0
let tickAction

// global time ticker, started on boot up and never stops
// updates each tournament state
function updateTime (t) {
  window.requestAnimationFrame(updateTime)

  const current = currentTime();
  const timePassed = current - lastUpdateAt
  const shouldUpdate = timePassed >= TIME_PRECISION

  if (shouldUpdate) {
    const mutations = {timePassed}

    lastUpdateAt = current
    tickAction(mutations)
  }

  prev = current
}

function timerController (action, next) {
  if (ALLOWED_ACTIONS.indexOf(action.type) < 0) return next(action)

  updateTime()

  return next(action)
}

export default function (store) {
  tickAction = createDispatchTick(store)

  return (next) => (action) => timerController(action, next)
}
