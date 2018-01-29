import Component from './Component';

export default class Title extends Component{

	constructor(state) {
		super(state);

		this._titleSpan = document.createElement('span');
		this._container.appendChild(this._titleSpan);

		this.render();
	}

	render() {
		const span = this._titleSpan;
		const state = this._state;
		const hot = Boolean(state.time.isHot);

		if(hot) {
			if(!span.classList.contains('hot')) span.classList.add('hot');

			span.textContent = `Hot ${state.title}`;
		}else{
			if(span.classList.contains('hot')) span.classList.remove('hot');

			span.textContent = state.title;
		}
	}

}