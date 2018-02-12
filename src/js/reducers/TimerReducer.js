// uncomment when using a bundle build
// import moment from 'moment'
// import Immutable from 'seamless-immutable'

export default function TimerReducer (state, action) {
  const {timePassed} = action.payload
  const newState = []

  for (let i = 0, len = state.length; i < len; i++) {
    const tournament = Immutable.asMutable(state[i], {deep: true})
    const time = tournament.time
    const now = moment(time.currentTime)
    const start = moment(time.startTime)
    const end = moment(time.endTime)
    const endMs = end.valueOf()

    const duration = endMs - start.valueOf()
    const hotMs = end - moment(time.hotTime)
    const total = tournament.time.timeLeft ? (tournament.time.timeLeft - timePassed) : (endMs - now.valueOf() - timePassed)
    const timeToHot = total - hotMs
    const timeToStart = total - duration
    const showCountdown = (timeToStart > 0) && (timeToStart <= 5000)

    time.duration = duration
    time.timeLeft = total
    time.timeHot = timeToHot
    time.isHot = (timeToHot <= 0)
    time.showCountdown = showCountdown
    time.timeToStart = timeToStart

    newState[i] = tournament
  }

  return newState
}
