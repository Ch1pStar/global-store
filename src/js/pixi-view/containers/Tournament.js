// import {Title, Countdown, Rewards, Timer, Leaderboard} from '../components/index'
import Button from '../components/Button'
import EnterController from '../../controllers/EnterController'
// import {Container} from 'pixi.js'
import Title from '../components/Title';
import Rewards from '../components/Rewards';
import RewardsFull from '../components/RewardsFull';
import Timer from '../components/Timer';
import Leaderboard from '../components/Leaderboard';

import {Container, Sprite, Texture} from 'pixi.js'
import Modal from '../components/base/Modal';
import PayoutsModal from './PayoutsModal';

import {EXPAND_PAYOUTS} from '../../actions/index';

export default class Tournament {

  constructor (state, store) {
    this._modalWindows = {};
    this._store = store;
    this._enterController = new EnterController(store)
    
    this.id = state.id
    this.state = state;

    this.stage = new Container();

    this._addBackground();
    this._addComponents();
    this._addPayoutsModal();

    this._updateSpace();
  }

  _addComponents() {
    const state = this.state;
    const stage = this.stage;
    const content = new Modal('Tournament Content');
    const title = new Title(state);
    const rewards = new Rewards(state);
    const rewardsFull = new RewardsFull(state);
    const leaderboard = new Leaderboard(state);
    const timer = new Timer(state.time);
    const enterButton = new Button(state, () => this._enterController.requestEnter(state.id));
    const payoutsFullButton = new Button(state, () => this._store.dispatch(EXPAND_PAYOUTS, state.id), {title: 'SEE ALL PRIZES'});

    stage.addChild(content);

    content.addChild(title);
    content.addChild(rewards);
    content.addChild(payoutsFullButton);
    content.addChild(leaderboard);
    content.addChild(timer);
    content.addChild(enterButton);

    payoutsFullButton.scale.set(.5);

    this.content = content;
    this.title = title;
    this.rewards = rewards;
    this.rewardsFull = rewardsFull;
    this.leaderboard = leaderboard;
    this.timer = timer;
    this.enterButton = enterButton;
  }

  update (state) {
    this.state = state;

    // this.countdown.state = state
    this.title.state = state
    this.rewards.state = state
    this.rewardsFull.state = state
    this.leaderboard.state = state
    this.timer.state = state.time
    this.enterButton.state = state

    if(!state.modal) return;    

    const modal = this._modalWindows[state.modal.type];

    if(!state.modal.wasOpened && !state.modal.wasClosed) {
      this.content.visible = false;

      // show modal animation
      modal.visible = true;
    }else if(state.modal.wasOpened && !state.modal.wasClosed) {
      // render already opened modal
      // console.log('render already opened modal');
    } else if(state.modal.wasOpened && state.modal.wasClosed) {
      this.content.visible = true;

      // hide modal animation
      modal.visible = false;
    }

  }

  _addPayoutsModal() {
    const payoutsModal = new PayoutsModal(this.rewardsFull, this._store, this.id);

    this._modalWindows.payouts = payoutsModal
    this.stage.addChild(payoutsModal);
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
    const payoutsModal = this._modalWindows.payouts
    const width = 350;
    const height = 730;

    content.x = width/2 - content.width/2;
    content.y = height/2 - content.height/2;

    payoutsModal.x = width/2 - payoutsModal.width/2;
    payoutsModal.y = height/2 - payoutsModal.height/2;
  }
}
