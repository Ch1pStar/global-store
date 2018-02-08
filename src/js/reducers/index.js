import timerReducer from './TimerReducer'
import {
  INIT, UPDATE,
  REQUEST_ENTER, TIME_TICK
} from '../actions/index'


function reducer (state = [], action) {
  // state = Immutable(state);
  // let nextState = Immutable.asMutable(state, {deep: true});
  let nextState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case UPDATE:
      // nextState = Immutable.asMutable(action.state, {deep: true})
      nextState = JSON.parse(JSON.stringify(action.state));
      break
    case REQUEST_ENTER:
      nextState.forEach((t, i) => (t.id === action.id) && (t.enterRequested = true))
      break
    case TIME_TICK:
      nextState = timerReducer(nextState, action.mutations)
      break
  }

  return nextState
}

export default reducer
