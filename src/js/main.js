import {get, goHot} from './util';
import middleware from './middleware/index';
import reducer from './reducers/index';

// ----------------------INIT----------------------------

var store = Redux.createStore(reducer, middleware);
window.goHot = goHot;
document.addEventListener('DOMContentLoaded', () => get(loaded));

function loaded(data) {
	const tournaments = data;

	const debug = document.querySelector('.debug-text');
	const btn = document.querySelector('.debug-update');

	debug.value = JSON.stringify({success: true, result: data});
	debug.addEventListener('paste', (e) => updateFromString(e.clipboardData.getData('Text')));

	btn.addEventListener('click', () => updateFromString(debug.value));

	window.store = store;
	store.dispatch({type:'init', state: tournaments});
}

function updateFromString(state) {
	store.dispatch({type:'update', state: JSON.parse(state).result})
}