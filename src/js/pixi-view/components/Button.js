import {Container, Text, Texture, Sprite, BLEND_MODES} from 'pixi.js'

export default class Button extends Container {

  constructor (state, action, texts = {title: 'Enter'}) {
    super();
    this.name = 'Button Component';
    this._state = state
    this.interactive = true;
    this.buttonMode = true;
    this.on('tap', action);
    this.on('click', action);

    const title = new Text(texts.title, {fill: 0xffffff, fontSize: 30});
    const background = Sprite.fromFrame('button');

    this.addChild(background);
    this.addChild(title);
    this._title = title;

    background.blendMode = BLEND_MODES.ADD

    title.anchor.set(.5);
    title.x = background.width/2;
    title.y = background.height/2;
  }

  render () {
    this.dirty = false
  }

  set state (state) {
    const isDisabled = Boolean(state.enterRequested)

    this.interactive = !isDisabled;
    this.buttonMode = !isDisabled;
    this._title.text = isDisabled ? 'Waiting' : 'Enter';

    this.visible = (state.status === 'pending')

    this._title.style.fill = state.time.isHot ? 0xff77aa : 0xffffff;

    this._state = state
    this.dirty = true
  }

}
