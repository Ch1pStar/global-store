export default function TimerReducer(state, action) {
	let nextState = state;

	nextState.forEach((t) => {
		t.time.timeLeft = action.total;
		t.time.isHot = action.timeToHot <= 0;
		t.time.duration = action.duration;
	});

	return nextState;
}