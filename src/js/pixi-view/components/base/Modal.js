import {Container, Texture, Text} from 'pixi.js';
import Component from './Component';

export default class Modal extends Component{

	constructor(name = 'Modal') {
		super(Texture.fromFrame('base'), {left: 10, top: 10, right: 10, bottom: 10});

		this.name = name;
	}
}
