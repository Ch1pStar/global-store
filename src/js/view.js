import TournamentContainer from './containers/Tournament'

let store;
const tournaments = [];
const onStateUpdate = () => {
    const state = store.getState();

    state.forEach((t, i) => tournaments[i].update(t))
}

export default function createView(data, st) {
  store = st;
  data.forEach((t) => tournaments.push(new TournamentContainer(t, store.dispatch)))

  store.subscribe(onStateUpdate);
}
