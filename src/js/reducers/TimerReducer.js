export default function TimerReducer (state, components) {
  state.forEach((t, i) => {
    const tournament = components[i]

    tournament.timer.state = t.time
    tournament.timer.dirty = true

    tournament.title.state = t
    tournament.title.dirty = true

    tournament.render()
  })

  return state
}
