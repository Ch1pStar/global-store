import createDispatchTick from '../actions/timeTick'

const ALLOWED_ACTIONS = ['update', 'init']

let prev = 0
let PRECISION = 10 // in ms, lowest possible is 16(60 fps)
let lastUpdateAt = 0
let tickAction

// global time ticker, started on boot up and never stops
// updates each tournament state
function updateTime (t) {
  window.requestAnimationFrame(updateTime)

  const current = window.performance.now() << 0
  const diff = current - prev
  const shouldUpdate = (current - lastUpdateAt) > PRECISION

  if (shouldUpdate) {
    const mutations = {timePassed: diff}

    lastUpdateAt = current
    tickAction(mutations)
  }

  prev = current
}

function stateController (action, next) {
  if (ALLOWED_ACTIONS.indexOf(action.type) < 0) return next(action)

  if (action.type === 'init') updateTime()

  return next(action)
}

export default function (store) {
  tickAction = createDispatchTick(store)

  return (next) => (action) => stateController(action, next)
}
