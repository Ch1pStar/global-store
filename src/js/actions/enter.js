import {get} from '../extra/util'
import {UPDATE, REQUEST_ENTER} from './index';

export default function enterTournament(action, dispatch, getState) {
  const id = action.payload;

  if (id < 0) return

  get(async (state) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    dispatch(UPDATE, state)
  }, 'src/mock/active.json')

}
