import timerReducer from './TimerReducer'
import enterReducer from './EnterReducer'
import {
  INIT, UPDATE,
  REQUEST_ENTER, TIME_TICK
} from '../actions/index'

const reducers = {
  [INIT]: {'*': (state = [], action) => state},
  [UPDATE]: {'*': (state = [], action) => action.payload},
  [REQUEST_ENTER]: {'*': enterReducer},
  [TIME_TICK]: {'*': timerReducer}
}

export default reducers
