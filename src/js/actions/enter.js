import {get} from '../extra/util'
import {UPDATE} from './index'

export default function enterTournament (action, dispatch, getState) {
  const id = action.payload

  if (id < 0) return

  // TODO fix builder browserify babel preset to support async/await
  // get(async (state) => {
  //   await new Promise((resolve) => setTimeout(resolve, 2000))
  get((state) => {
    setTimeout(() => {
    	dispatch(UPDATE, state)
    }, 2000);

  }, 'src/mock/active.json')
}
