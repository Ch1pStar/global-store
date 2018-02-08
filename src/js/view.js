import TournamentContainer from './containers/Tournament'

export default class View {
  constructor (data, store) {
    this.store = store
    this.tournaments = []

    data.forEach((t) => this.tournaments.push(new TournamentContainer(t, store.dispatch)))

    store.subscribe(this.onStateUpdate.bind(this))
  }

  onStateUpdate () {
    const state = this.store.getState()

    state.forEach((t, i) => this.tournaments[i].update(t))
  }
}
