import * as PIXI from 'pixi.js'

export default class Leaderboard extends PIXI.Container {

  constructor (state) {
    super();
    this._state = state
    this.name = 'Leaderboard Component';

    const title = new PIXI.Text('Leaderboard', {fill: 0xffffff, fontSize: 18});
    const text = new PIXI.Text(this._leaderboardString, {fill: 0xffffff, fontSize: 16});


    this._title = title;
    this._text = text;

    this._text.y = this._title.height + 10;

    this.addChild(this._title, this._text);
  }

  render () {
    this.dirty = false
  }

  set state (val) {
    this._state = val
    this.dirty = true

    const text = this._text;

    text.style.fill = val.time.isHot ? 0xff77aa : 0xffffff;
    text.text = this._leaderboardString;
  }

  get _leaderboardString() {
    let cntString = '';

    this._state.leaderboard.groups.forEach((group, i) => {
      group.forEach((part) => {
        cntString += `\t${part.place}. ${part.displayName} \t\t ${part.points}\n`
      });
      cntString += '\n';
    })

    return cntString;
  }

}
