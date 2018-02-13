// import {Title, Countdown, Rewards, Timer, Leaderboard} from '../components/index'
// import Button from '../components/ActionButton'
import EnterController from '../../controllers/EnterController'
// import {Container} from 'pixi.js'
import Title from '../components/Title';
import Rewards from '../components/Rewards';
import Timer from '../components/Timer';

import * as PIXI from 'pixi.js'

const Container = PIXI.Container;

export default class Tournament {

  constructor (state, store) {
    this._enterController = new EnterController(store)
    this._enterController.requestEnter(state.id)
    this.id = state.id

    this.stage = new Container();

    this.title = new Title(state);
    this.rewards = new Rewards(state);
    this.timer = new Timer(state.time);

    this.rewards.y = this.title.height + 20;
    this.timer.y =  this.rewards.y + this.rewards.height + 20;

    this.stage.addChild(this.title, this.rewards, this.timer);

    // this.render()
  }

  update (state) {
    // this.countdown.state = state
    this.title.state = state
    this.rewards.state = state
    // this.leaderboard.state = state
    this.timer.state = state.time
    // this.button.state = state

    this.render()
  }

  render () {
    this.title.render();
    this.rewards.render();
    this.timer.render();
  }
}
