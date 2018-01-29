import timerReducer from './TimerReducer';
import Tournament from '../Tournament';

let tournament;

function reducer(state, action) {
	if(!state) return action.state || [];

	let nextState = state;

	switch(action.type) {
		// case '@@redux/INIT':
		// 	nextState.forEach(init);
		// 	break;
		case 'init':
			nextState = action.state;
			nextState.forEach((t)=> tournament = new Tournament(t));
			break;
		case 'update':
			nextState = action.state;
			// update everything
			nextState.forEach((t) => tournament.update(t));
			break;
		case 'timeTick':
			nextState = timerReducer(state, action);
			nextState.forEach((t) => {
				// update only specific time related components
				// TODO Proper diff logic
				tournament.timer.state = t.time
				tournament.title.state = t;
			});
			break;
	}

	return nextState;
}

export default reducer;
