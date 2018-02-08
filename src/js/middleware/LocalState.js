import {UPDATE} from '../actions/index';

const ALLOWED_ACTIONS = [UPDATE]

const integrateLocalState = (store) => (next) => (action) => {
  if (ALLOWED_ACTIONS.indexOf(action.type) < 0) return next(action)

  const stored = JSON.parse(window.localStorage.getItem('viewed-tournaments')) || []

  action.state.forEach((state) => {
  state.viewed = stored.indexOf(state.id) > -1

    // if(action.type == INIT){
    // 	state.time.duration = 0
    //   state.time.timeLeft = 0
    //   state.time.timeHot = 0
    //   state.time.isHot = false
    //   state.time.showCountdown = false
    //   state.time.timeToStart = 0
    // }
  })

  return next(action)
}

export default integrateLocalState
