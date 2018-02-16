// import {Title, Countdown, Rewards, Timer, Leaderboard} from '../components/index'
import Button from '../components/Button'
import EnterController from '../../controllers/EnterController'
// import {Container} from 'pixi.js'
import Title from '../components/Title';
import Rewards from '../components/Rewards';
import Timer from '../components/Timer';
import Leaderboard from '../components/Leaderboard';

import {Container, Sprite, Texture} from 'pixi.js'
import Modal from '../components/base/Modal';

export default class Tournament {

  constructor (state, store) {
    this._enterController = new EnterController(store)
    
    this.id = state.id
    this.state = state;

    this.stage = new Container();

    this._addBackground();
    this._addComponents();

    this._updateSpace();
  }

  _addComponents() {
    const state = this.state;
    const stage = this.stage;
    const content = new Modal();
    const title = new Title(state);
    const rewards = new Rewards(state);
    const leaderboard = new Leaderboard(state);
    const timer = new Timer(state.time);
    const enterButton = new Button(state, () => this._enterController.requestEnter(state.id));

    stage.addChild(content);

    content.addChild(title);
    content.addChild(rewards);
    content.addChild(leaderboard);
    content.addChild(timer);
    content.addChild(enterButton);

    this.content = content;
    this.title = title;
    this.rewards = rewards;
    this.leaderboard = leaderboard;
    this.timer = timer;
    this.enterButton = enterButton;
  }

  _addBackground() {
    this.background = Sprite.fromFrame('background');
    // this.background.scale.set(.3565);
    this.background.scale.set(.4);
    this.background.name = 'Tournament Background'

    this.stage.addChild(this.background);
  }

  _updateSpace() {
    const content = this.content;
    const width = 350;
    const height = 730;

    content.x = width/2 - content.width/2;
    content.y = height/2 - content.height/2;
  }

  update (state) {
    this.state = state;

    // this.countdown.state = state
    this.title.state = state
    this.rewards.state = state
    this.leaderboard.state = state
    this.timer.state = state.time
    this.enterButton.state = state

    // this.render()
  }

  render () {
    // this.title.render();
    // this.rewards.render();
    // this.timer.render();
  }
}
