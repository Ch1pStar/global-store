import timerReducer from './TimerReducer'

function reducer (state = [], action) {
  // state = Immutable(state);
  // let nextState = Immutable.asMutable(state, {deep: true});
  let nextState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case 'update':
      // nextState = Immutable.asMutable(action.state, {deep: true})
      nextState = action.state
      break
    case 'enterRequested':
      nextState.forEach((t, i) => (t.id === action.id) && (t.enterRequested = true))
      break
    case 'timeTick':
      nextState = timerReducer(nextState, action.mutations)
      break
  }

  return nextState
}

export default reducer
