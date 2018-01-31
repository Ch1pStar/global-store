import {get} from '../util';

export default function enterReducer (state, id) {
  const tournament = state.filter((t) => t.id == id)[0];

  // Send tournament enter request
  get((state) => {
    window.store.dispatch({type: 'update', state})
  }, 'src/mock/active.json')

  return state
}
