export default function TimerReducer (state, components) {
  // update only specific time related components
  state.forEach((t, i) => {
    const tournament = components[i]

    tournament.timer.state = t.time
    tournament.title.state = t

    tournament.render()
  })

  return state
}
