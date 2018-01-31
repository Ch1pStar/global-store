import {get} from '../util'

const enterTournament = ({dispatch, getState}, id = -1) => () => {
  if (id < 0) return

  // TODO send real request with tournament id
  get((state) => dispatch({type: 'update', state}), 'src/mock/active.json')
}

export default enterTournament
