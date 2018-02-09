import enterTournament from './enter'

export const INIT = 'init'
export const UPDATE = 'update'
export const REQUEST_ENTER = 'enterRequested'
export const TIME_TICK = 'timeTick'

export const thunkActions = {
  [REQUEST_ENTER]: enterTournament
}
