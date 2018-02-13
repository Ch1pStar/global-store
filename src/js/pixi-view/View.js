import TournamentContainer from './containers/Tournament'

export default class View {
  constructor (data, store) {
    this.store = store
    this.tournaments = []
    this.onStateUpdate = this.onStateUpdate.bind(this)

    data.forEach((t) => this.tournaments.push(new TournamentContainer(t, store)))

    store.subscribe(this.onStateUpdate)
  }

  onStateUpdate () {
    const state = this.store.getState()

    state.forEach((t, i) => this.tournaments[i].update(t))
  }

  get stage() {
    return this.tournaments[this.tournaments.length-1].stage;
  }
}
