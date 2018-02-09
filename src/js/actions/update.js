import {UPDATE} from './index'

export const createUpdateFromStringAction = ({dispatch, getState}) => (state) => {
  dispatch(UPDATE, JSON.parse(state).result)
}

export const createUpdateAction = ({dispatch, getState}) => (state) => {
  dispatch(UPDATE, state)
}
