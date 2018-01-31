const ALLOWED_ACTIONS = ['update', 'init'];

let prev = 0;
let store;
let PRECISION = 0; // in ms, lowest possible is 16(60 fps)
let lastUpdateAt = 0;
const tournaments = [];

// global time ticker, started on boot up and never stops
// updates each tournament state
function updateTime(t) {
	requestAnimationFrame(updateTime);

	const current = performance.now()<<0;
	const diff = current-prev;
	const shouldUpdate = (current - lastUpdateAt) > PRECISION;
	const states = [];

	prev = current;

	for(let i=0,len=tournaments.length;i<len;i++) {
		let t = tournaments[i];

		t.deductTime(diff);
		states.push(t.state);
	}

	if(shouldUpdate){
		lastUpdateAt = current;
		dispatchTick(states);
	}

}

function dispatchTick(state) {
	if(!store) return;

	store.dispatch({type: 'timeTick', state});
}

export default function stateController(st) {
	store = st;
	return (next) => (action) => {
		if(ALLOWED_ACTIONS.indexOf(action.type)<0) return next(action);

		tournaments.length = 0;

		action.state.forEach((t) => tournaments.push(new TournamentController(t)));

		if(action.type === 'init') updateTime();

		return next(action);
	}
}

class TournamentController{

	constructor(data){
		const state = data;
		const time = state.time;
		const now = moment(time.currentTime);
		const start = moment(time.startTime);
		const end = moment(time.endTime);

		this._timeToHot = Infinity;

		this._duration = end.valueOf() - start.valueOf();

		this._hotMs = end - moment(time.hotTime);

		this._total = end.valueOf() - now.valueOf();
	}

	deductTime(val) {
		this._total -= val;
		this._timeToHot = this._total - this._hotMs;
	}

	get state() {
		return {total: this._total, timeToHot: this._timeToHot, duration: this._duration}
	}
}