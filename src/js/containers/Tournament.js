import {Title, Rewards, Timer, Leaderboard} from '../components/index'
import Button from '../components/EnterButton'
import createEnterAction from '../actions/enter'

export default class Tournament {

  // TODO Pass store to tournament container, react-redux connect magic
  constructor (state) {
    this.visible = true
    this.appContainer = document.querySelector('.app-wrapper');

    this.title = new Title(state, this.appContainer)
    this.rewards = new Rewards(state, this.appContainer)
    this.timer = new Timer(state.time, this.appContainer)
    this.leaderboard = new Leaderboard(state, this.appContainer)
    this.button = new Button(state, this.appContainer, createEnterAction(store, state.id))
    this.id = state.id


    this.render()
  }

  update (state) {
    this.title.state = state
    this.rewards.state = state
    this.leaderboard.state = state
    this.timer.state = state.time
    this.button.state = state

    this.render()
  }

  render () {
    if (this.title.dirty) this.title.render()
    if (this.rewards.dirty) this.rewards.render()
    if (this.timer.dirty) this.timer.render()
    if (this.leaderboard.dirty) this.leaderboard.render()
    if (this.button.dirty) this.button.render()
  }
}
