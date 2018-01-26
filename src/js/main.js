function get(callback, url='src/mock/settings.json') {fetch(url).then((res)=>res.json()).then((data)=>callback(data.result));}

document.addEventListener('DOMContentLoaded', () => get(loaded));

function loaded(data){
	const tournaments = data;
	const store = Redux.createStore(reducer, tournaments);

	const debug = document.querySelector('.debug-text');
	const btn = document.querySelector('.debug-update');

	debug.value = JSON.stringify({success: true, result: data});
	debug.addEventListener('paste', (e) => updateFromString(e.clipboardData.getData('Text')));

	btn.addEventListener('click', () => updateFromString(debug.value));

	window.store = store;
}

function updateFromString(state) {
	store.dispatch({type:'update', state: JSON.parse(state).result})
}

function goHot() { get((state)=>{
		store.dispatch({type:'update', state});
	}, 'src/mock/hot.json');
}


function reducer(state, action) {
	console.log(action);

	switch(action.type) {
		case '@@redux/INIT':
			state.forEach(init);
			break;
		case 'update':
			action.state.forEach(update);
			break;
	}
}

const HOUR = 3600000;
const MINUTE = 60000;
const SECOND  = 1000;

let rewards;
let leaderboard;
let timer;

function init(tournament) {
	console.log(tournament);

	rewards = new Rewards(tournament.rewards);
	leaderboard = new Leaderboard(tournament.leaderboard);
	timer = new Timer(tournament.time);
}

function update(tournament) {
	rewards.state = tournament.rewards;
	leaderboard.state = tournament.leaderboard;
	timer.state = tournament.time;
}

class Component{
	// state = null;
	// _container = null;

	constructor(state) {
		this._state = state;

		const cnt = this._container = document.createElement('div');

		cnt.className = 'component-container component-wrapper';
		this.render();
		document.body.appendChild(cnt);
	}	

	set state(val) {
		this._state = val;
		this.render();
	}

	clearCnt(){
		this._container.innerText = '--------------------------------';
	}
}

class Timer extends Component{

	constructor(state){
		super(state);	
		const inner = this._inner = document.createElement('div');
		const startSpan = this._startSpan = document.createElement('span');
		const endSpan =  this._endSpan = document.createElement('span');

		this._container.innerText = '------------TIMER------------';
		this._container.appendChild(inner);

		inner.className = 'component-container inner';
		inner.appendChild(startSpan);
		inner.appendChild(endSpan);
		this.startCountdown();
		this.render();
	}

	render() {
		if(!this._inner) return;

		this._startSpan.innerText = `Starts in: ${this._formatRemaining(this._total - this._duration)}`;
		this._endSpan.innerText = `Ends in: ${this._formatRemaining(this._total)}`;

		if(this._hot && !this._endSpan.classList.contains('hot')) this._endSpan.classList.add('hot');
	}


	set state(val) {
		this._state = val;
		this.startCountdown();
		this.render();
	}

	startCountdown() {
		const state = this._state;
		const now = moment(state.currentTime);
		const start = moment(state.startTime);
		const end = moment(state.endTime);
		const hotMs = end - moment(state.hotTime);
		const duration = end.valueOf() - start.valueOf();
		let total = end.valueOf() - now.valueOf();
		let prev = performance.now();
		const updateTime = () => {
			requestAnimationFrame(updateTime);

			const current = performance.now();
			const diff = current-prev;

			prev = current;
			total -= diff;
			this._total = parseInt(total, 10);
			this._hot = this._total < hotMs;
			this.render();
		}

		this._duration = duration;
		requestAnimationFrame(updateTime);
		updateTime();
	}

	_formatRemaining(ms) {
		if(ms <= 0) return '-------------DONE-------------------';

		const hours = parseInt(ms/HOUR);
		const minutes = parseInt((ms%HOUR)/MINUTE);
		const seconds = parseInt(((ms%HOUR)%MINUTE)/SECOND);
		const msLeft = parseInt(((ms%HOUR)%MINUTE)%seconds)

		return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${msLeft}`;
	}

	clearCnt(){
		this._container.innerText = '------------TIMER------------';
	}
}

class Leaderboard extends Component{

	render() {
		const cnt = this._container;
		const state = this._state;

		this.clearCnt();
		state.groups.forEach((group) => {
			const inner = document.createElement('inner');

			inner.className = 'component-container inner';
			inner.innerText = '--------------------';
			group.forEach((part) => {
				const span = document.createElement('span');
				const text = `${part.place}. ${part.displayName} ${part.points}`;

				span.innerText = text;

				inner.appendChild(span);
			});

			cnt.appendChild(inner);
		});
	}

	clearCnt(){
		this._container.innerText = '-----------Leaderboard-----------';
	}
}

class Rewards extends Component{

	render() {
		const cnt = this._container;
		const state = this._state;

		this.clearCnt();
		state.forEach((reward) => {
			const span = document.createElement('span');

			span.className = 'inner';
			span.innerText = `${reward.from}-${reward.to} => ${reward.symbol}${parseFloat(reward.amount, 10).toFixed(2)}`;
			cnt.appendChild(span);
		});
	}

	clearCnt(){
		this._container.innerText = '-----------Payouts-----------';
	}
}



// -------------------- UTIL ---------------------
