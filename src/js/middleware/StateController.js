import createDispatchTick from '../actions/timeTick'

const ALLOWED_ACTIONS = ['update', 'init']

let prev = 0
let PRECISION = 10 // in ms, lowest possible is 16(60 fps)
let lastUpdateAt = 0
let tickAction
let getState

const moment = window.moment

// global time ticker, started on boot up and never stops
// updates each tournament state
function updateTime (t) {
  window.requestAnimationFrame(updateTime)

  const current = window.performance.now() << 0
  const diff = current - prev
  const shouldUpdate = (current - lastUpdateAt) > PRECISION
  const mutations = {timePassed: diff}
  const nextState = mutateState(getState(), mutations)

  if (shouldUpdate && nextState.length) {
    lastUpdateAt = current
    tickAction(nextState)
  }

  prev = current
}

function stateController (action, next) {
  if (ALLOWED_ACTIONS.indexOf(action.type) < 0) return next(action)

  if (action.type === 'init') updateTime()

  return next(action)
}

function mutateState (currState, {timePassed}) {
  const state = currState

  for (let i = 0, len = state.length; i < len; i++) {
    const tournament = state[i]
    const time = tournament.time
    const now = moment(time.currentTime)
    const start = moment(time.startTime)
    const end = moment(time.endTime)
    const endMs = end.valueOf()

    const duration = endMs - start.valueOf()
    const hotMs = end - moment(time.hotTime)
    const total = tournament.time.timeLeft ? (tournament.time.timeLeft - timePassed) : (endMs - now.valueOf() - timePassed)
    const timeToHot = total - hotMs

    tournament.time.duration = duration
    tournament.time.timeLeft = total
    tournament.time.timeHot = timeToHot
    tournament.time.isHot = timeToHot <= 0
  }

  return state
}

export default function (store) {
  tickAction = createDispatchTick(store);
  getState = store.getState;

  return (next) => (action) => stateController(action, next)
}
