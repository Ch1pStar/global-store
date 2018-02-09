import {Title, Countdown, Rewards, Timer, Leaderboard} from '../components/index'
import Button from '../components/ActionButton'
import EnterController from '../controllers/EnterController'

export default class Tournament {
  constructor (state, store) {
    this.visible = true
    this.appContainer = document.querySelector('.app-wrapper')

    this.title = new Title(state, this.appContainer)
    this.rewards = new Rewards(state, this.appContainer)
    this.timer = new Timer(state.time, this.appContainer)
    this.countdown = new Countdown(state, this.appContainer)
    this.leaderboard = new Leaderboard(state, this.appContainer)

    this._enterController = new EnterController(store)
    this.button = new Button(state, this.appContainer, () => this._enterController.requestEnter(state.id))
    this.id = state.id

    this.render()
  }

  update (state) {
    this.countdown.state = state
    this.title.state = state
    this.rewards.state = state
    this.leaderboard.state = state
    this.timer.state = state.time
    this.button.state = state

    this.render()
  }

  timeUpdate (state) {
    this.timer.state = state.time
    this.title.state = state
    this.countdown.state = state

    this.render()
  }

  render () {
    if (this.countdown.dirty) this.countdown.render()
    if (this.title.dirty) this.title.render()
    if (this.rewards.dirty) this.rewards.render()
    if (this.timer.dirty) this.timer.render()
    if (this.leaderboard.dirty) this.leaderboard.render()
    if (this.button.dirty) this.button.render()
  }
}
