import * as PIXI from 'pixi.js'

export default class Title extends PIXI.Container {

  constructor (state) {
    super();
    this._state = state

    const text = new PIXI.Text(state.title, {fill: 0xffffff, fontSize: 18});

    this.addChild(text);
    this._text = text;
  }

  render () {
    this.dirty = false
  }

  set state (val) {
    this._state = val
    this.dirty = true

    this._text.text = val.title;
    this._text.style.fill = val.time.isHot ? 0xff77aa : 0xffffff;
  }

}
