import timerReducer from './TimerReducer'
import enterReducer from './EnterReducer'
import {expandPayouts, payoutsShown, colapsePayouts} from './PayoutsReducer'
import {
  INIT, UPDATE,
  EXPAND_PAYOUTS, PAYOUTS_SHOWN, COLAPSE_PAYOUTS,
  REQUEST_ENTER, TIME_TICK
} from '../actions/index'

const reducers = {
  [INIT]: {'*': (state = [], action) => state},
  [UPDATE]: {'*': (state = [], action) => action.payload},
  [REQUEST_ENTER]: {'*': enterReducer},
  [TIME_TICK]: {'*': timerReducer},
  [EXPAND_PAYOUTS]: {'*': expandPayouts},
  [PAYOUTS_SHOWN]: {'*': payoutsShown},
  [COLAPSE_PAYOUTS]: {'*': colapsePayouts},
}

export default reducers
