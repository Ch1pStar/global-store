import Modal from '../components/base/Modal'
import Button from '../components/Button'
import {COLAPSE_PAYOUTS} from '../../actions/index'

export default class PayoutsModal extends Modal {

  constructor(rewards, store, id) {
    super('Payouts Modal')

    const closeButton = new Button(store.getState(), () => store.dispatch(COLAPSE_PAYOUTS, id), {title: 'Close'});

    closeButton.scale.set(.5);

    this.addChild(rewards);
    this.addChild(closeButton);

    this.visible = false;
  }
}