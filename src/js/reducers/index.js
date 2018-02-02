import timerReducer from './TimerReducer'
import TournamentContainer from '../containers/Tournament'

// tournament visual component
// TODO Create state manager class to replace this array
const tournaments = []

function reducer (state, action) {
  if (!state) return action.state || []

  let nextState = state

  switch (action.type) {
    case 'init':
      nextState = action.state
      nextState.forEach((t) => tournaments.push(new TournamentContainer(t, action.store)))
      break
    case 'update':
      nextState = action.state
      nextState.forEach((t, i) => tournaments[i].update(t))
      break
    case 'timeTick':
      nextState = timerReducer(nextState, action.mutations, tournaments)
      break
  }

  return nextState
}

export default reducer
