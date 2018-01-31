import {Title, Rewards, Timer, Leaderboard} from '../components/index'
import Button from '../components/EnterButton';
import createEnterAction from '../actions/enter';

export default class Tournament {
  constructor (state, store = window.store) {
    this.visible = true

    this.title = new Title(state)
    this.rewards = new Rewards(state.rewards)
    this.timer = new Timer(state.time)
    this.leaderboard = new Leaderboard(state.leaderboard)
    this.button = new Button(state, createEnterAction(store, state.id));
    this.id = state.id;

    this.render()
  }

  update (state) {
    this.title.state = state
    this.rewards.state = state.rewards
    this.leaderboard.state = state.leaderboard
    this.timer.state = state.time
    this.button.state = state;

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
