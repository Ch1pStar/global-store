export default class Component{
	// state = null;
	// _container = null;

	constructor(state) {
		this._state = state;

		const cnt = this._container = document.createElement('div');

		cnt.className = 'component-container component-wrapper';
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