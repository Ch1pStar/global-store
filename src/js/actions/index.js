import enterTournament from './enter'
import {expandPayouts} from './payouts'

export const INIT = 'init'
export const UPDATE = 'update'
export const REQUEST_ENTER = 'enterRequested'
export const TIME_TICK = 'timeTick'
export const EXPAND_PAYOUTS = 'expandPayouts'
export const COLAPSE_PAYOUTS = 'colapsePayouts'
export const PAYOUTS_SHOWN = 'payoutsShown'

export const thunkActions = {
  [REQUEST_ENTER]: enterTournament,
  [EXPAND_PAYOUTS]: expandPayouts,
}
