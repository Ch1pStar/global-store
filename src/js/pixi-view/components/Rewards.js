export default class Rewards extends PIXI.Container {

  constructor (state) {
    super();
    this._state = state

    const text = new PIXI.Text('Rewards', {fill: 0xffffff, fontSize: 20});

    this.addChild(text);
    this._title = text;

    const cnt = this.cnt = new PIXI.Container();

    state.rewards.forEach((reward, i) => {
      const row = new PIXI.Text(`${String(reward.from).padStart(2, '0')}-${String(reward.to).padStart(2, '0')} => ${reward.symbol}${parseFloat(reward.amount, 10).toFixed(2).padStart(7, '0')}`, {
        fill: 0xffffff, fontSize: 20
      })

      row.y = i*(row.height+10)
      cnt.addChild(row);
    })

    cnt.y = text.height + 10;

    this.addChild(cnt);
  }

  render () {
    this.dirty = false
  }

  set state (val) {
    this._state = val
    this.dirty = true

    this._title.style.fill = val.time.isHot ? 0xff77aa : 0xffffff;

    this.cnt.removeChildren();

    // slow
    this._state.rewards.forEach((reward, i) => {
      const row = new PIXI.Text(`${String(reward.from).padStart(2, '0')}-${String(reward.to).padStart(2, '0')} => ${reward.symbol}${parseFloat(reward.amount, 10).toFixed(2).padStart(7, '0')}`, {
        fill: 0xffffff, fontSize: 20
      })

      row.y = i*(row.height+10)
      this.cnt.addChild(row);
    })
  }

}
