import TournamentContainer from './containers/Tournament'

export default class View {
  constructor (data, store) {
    this.store = store
    this.tournaments = []
    this.onStateUpdate = this.onStateUpdate.bind(this)
    this._state = data;
  }

  onStateUpdate () {
    const state = this.store.getState()

    this._state = state;
    state.forEach((t, i) => this.tournaments[i].update(t))
  }

  init() {
    this._state.forEach((t) => this.tournaments.push(new TournamentContainer(t, this.store)))

    this.store.subscribe(this.onStateUpdate)
  }

  get stage() {
    return this.tournaments[this.tournaments.length-1].stage;
  }

  set orientation (orientation) {
    this._orientation = orientation
  }

  get orientation () {
    return this._orientation
  }

  set size (size) {
    this._stageSize = size

    // this.children.forEach((child) => child.size = size) // eslint-disable-line no-return-assign
  }

  get size () {
    return this._stageSize
  }
}
