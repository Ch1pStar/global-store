import {get} from '../extra/util'


const enterTournament = (dispatch, id = -1) => () => {
  if (id < 0) return

  console.log('requesting next state...')

  // TODO send real request with tournament id
  get(async (state) => {
    dispatch('enterRequested', id)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log('got it...carry on')

    dispatch('update', state)
  }, 'src/mock/active.json')
}

export default enterTournament
