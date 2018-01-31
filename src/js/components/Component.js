export default class Component{
	// state = null;
	// _container = null;

	constructor(state) {
		this._state = state;
		this.dirty = true;

		const cnt = this._container = document.createElement('div');

		cnt.className = 'component-container component-wrapper';
		document.body.appendChild(cnt);
	}

	render() {
		this.dirty = false;
	}

	set state(val) {
		this._state = val;
	}

	clearCnt(){
		this._container.innerText = '--------------------------------';
	}
}