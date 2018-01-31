export default function TimerReducer(state, action) {
	let nextState = state;
	const mutations = action.state;

	nextState.forEach((t, i) => {
		t.time.timeLeft = mutations[i].total;
		t.time.isHot = mutations[i].timeToHot <= 0;
		t.time.duration = mutations[i].duration;
	});

	return nextState;
}