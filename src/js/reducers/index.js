import timerReducer from './TimerReducer'
import enterReducer from './enterReducer'
import TournamentComponent from '../containers/Tournament'

// tournament visual component
// TODO Create state manager class to replace this array
const tournaments = []

function reducer (state, action) {
  if (!state) return action.state || []

  let nextState = state

  switch (action.type) {
    case 'init':
      nextState = action.state
      nextState.forEach((t) => tournaments.push(new TournamentComponent(t)))
      break
    case 'update':
      nextState = action.state
      nextState.forEach((t, i) => tournaments[i].update(t))
      break
    case 'timeTick':
      nextState = timerReducer(nextState, tournaments)
      break
    case 'enter':
      nextState = enterReducer(nextState, action.id);
      break
  }

  return nextState
}

export default reducer
