const moment = window.moment

export default function TimerReducer (state, {timePassed}, components) {
  state.forEach((t, i) => {
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
    const visualComponenet = components[i]

    tournament.time.duration = duration
    tournament.time.timeLeft = total
    tournament.time.timeHot = timeToHot
    tournament.time.isHot = timeToHot <= 0

    visualComponenet.timer.state = t.time
    visualComponenet.title.state = t

    visualComponenet.render()
  })

  return state
}
