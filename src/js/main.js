function get(callback, url='src/mock/settings.json') {
	fetch(url).then((res)=>res.json()).then((data)=>callback(data.result));
}
document.addEventListener('DOMContentLoaded', () => get(loaded));

function loaded(data){
	const tournaments = data;
	const store = Redux.createStore(reducer, tournaments);

	window.store = store;
}

function reducer(state, action) {
	console.error(action.type);

	switch(action.type) {
		case '@@redux/INIT':
			state.forEach(init);
			break;
		case 'update':
			state.forEach(update);
			break;
	}
}

let rewards;

function init(tournament) {
	console.log(tournament);

	rewards = new Rewards(tournament.rewards);
}

function update(tournament) {
	console.log(tournament);


}

class Rewards{
	// state = null;
	// _container = null;

	constructor(state) {
		this._state = state;

		const cnt = this._container = document.createElement('div');
		this.render();

		cnt.style.display = 'flex';
		cnt.style['flex-direction'] = 'column';
		document.body.appendChild(cnt);
	}

	render() {
		const cnt = this._container;
		const state = this._state;

		cnt.innerHtml = '';
		state.forEach((reward) => {
			const span = document.createElement('span');

			span.innerText = `${reward.from} - ${reward.to} ${reward.currency}${reward.amount}`;
			cnt.appendChild(span);
		});
	}

	set state(val) {
		this._state = val;
		this.render();
	}
}