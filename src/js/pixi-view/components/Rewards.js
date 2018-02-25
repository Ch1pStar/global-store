import * as PIXI from 'pixi.js'

export default class Rewards extends PIXI.Container {

  constructor (state) {
    super();
    this.name = 'Rewards Component';
    this._state = state

    // const text = new PIXI.Text('Rewards', {fill: 0xffffff, fontSize: 18});
    // this._title = text;
    this._title = PIXI.Sprite.fromFrame('d');
    this.addChild(this._title);

    const cnt = this.cnt = new PIXI.Container();

    const rewardsText = new PIXI.Text(this._rewardsString, {fill: 0xffffff, fontSize: 16});
    cnt.y = this._title.height + 10;

    cnt.addChild(rewardsText);
    this.addChild(cnt);
  }

  render () {
    this.dirty = false
  }

  set state (val) {
    this._state = val
    this.dirty = true

    const rewardsText = this.cnt.children[0];

    rewardsText.style.fill = val.time.isHot ? 0xff77aa : 0xffffff;
    rewardsText.text = this._rewardsString;
  }

  get _rewardsString() {
    let cntString = '';

    this._state.rewards.forEach((reward, i) => {
      if(i>=2) return;
      cntString += `${String(reward.from).padStart(2, '0')}-${String(reward.to).padStart(2, '0')} => ${reward.symbol}${parseFloat(reward.amount, 10).toFixed(2).padStart(7, '0')}\n`
    })

    return cntString;
  }

}
