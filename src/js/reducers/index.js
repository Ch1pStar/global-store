import timerReducer from './TimerReducer';
import TournamentComponent from '../components/Tournament';

// tournament visual component
const tournaments = [];

function reducer(state, action) {
	if(!state) return action.state || [];

	let nextState = state;

	switch(action.type) {
		// case '@@redux/INIT':
		// 	nextState.forEach(init);
		// 	break;
		case 'init':
			nextState = action.state;
			nextState.forEach((t)=> tournaments.push(new TournamentComponent(t)));
			break;
		case 'update':
			nextState = action.state;
			// update everything
			nextState.forEach((t, i) => tournaments[i].update(t));

			break;
		case 'timeTick':
			// Integrate action properties into the global state
			nextState = timerReducer(nextState, action);

			// update only specific time related components
			// TODO map components requiring update to each action
			nextState.forEach((t, i) => {
				const tournament = tournaments[i];

				tournament.timer.state = t.time
				tournament.timer.dirty = true;

				tournament.title.state = t;
				tournament.title.dirty = true;

				tournament.render();
			});
			break;
	}

	return nextState;
}

export default reducer;
