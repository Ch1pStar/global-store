const ALLOWED_ACTIONS = ['update', 'init'];

let total = Infinity;
let prev = 0;
let hotMs = 0;
let store;
let duration = 0;
let PRECISION = 16; // in ms, lowest possible is 16(60 fps)
let lastUpdateAt = 0;

export default function TimerController(st) {
	store = st;
	return (next) => (action) => {
		if(ALLOWED_ACTIONS.indexOf(action.type)<0) return next(action);

		const state = action.state[0];
		const time = state.time;
		const now = moment(time.currentTime);
		const start = moment(time.startTime);
		const end = moment(time.endTime);

		duration = end.valueOf() - start.valueOf();

		hotMs = end - moment(time.hotTime);

		total = end.valueOf() - now.valueOf();

		if(action.type === 'init') updateTime();

		return next(action);
	}
}

function updateTime(t) {
	requestAnimationFrame(updateTime);

	const current = performance.now()<<0;
	const diff = current-prev;
	const shouldUpdate = (current - lastUpdateAt) > PRECISION;

	prev = current;
	total -= diff;

	if(shouldUpdate){
		const timeToHot = total - hotMs;

		lastUpdateAt = current;
		store.dispatch({type: 'timeTick',
			total,
			timeToHot,
			duration
		});
	}

}