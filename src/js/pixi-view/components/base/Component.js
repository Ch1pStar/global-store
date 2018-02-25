import {Container, mesh, Texture, Sprite} from 'pixi.js'

export default class Component extends Container {

	/**
	 * Content offsets, determines NineSlicePlane borders size
	 * @type {[type]}
	 * @private
	 */
	_offsets = null;


	// TODO Reposition children when removing an element
	constructor(txt = Texture.EMPTY, offsets = {left: 0, top: 0, right: 0, bottom: 0}) {
		super();
		this.direction = Component.DIRECTIONS.DOWN;
		this.name = 'Component'

		const cnt = new Container();
		const background = new mesh.NineSlicePlane(txt, offsets.left, offsets.top, offsets.right, offsets.bottom);

		cnt.name = 'Content';
		background.name = 'Component Background';

		// TODO Implement wrapping
		this.maxWidth = cnt.width;
		this.maxHeight = cnt.height;

		this._offsets = offsets;

		background.width = 0;
		background.height = 0;

		cnt.x = (this.width/2 - cnt.width/2) + offsets.left;
		cnt.y = (this.height/2 - cnt.height/2) + offsets.top;

		this._container = cnt;
		this._background = background;
		this._addChild(this._background)
		this._addChild(this._container)
	}

	addChild(child) {
		const cnt = this._container;
		const bg = this._background;

		this._positionElement(child);

		cnt.addChild(child);

		bg.width = cnt.width + (this._offsets.left + this._offsets.right);
		bg.height = cnt.height + (this._offsets.top + this._offsets.bottom);
	}

	removeChild(child) {
		this._container.removeChild(child);
	}

	clearChildren() {
		this._container.removeChildren();
	}

	get container() {
		return this._container;
	}

	get background() {
		return this._background;
	}

	_addChild(child) {
		super.addChild(child);
	}

	_positionElement(child) {
		const cnt = this._container;
		const direction = this.direction;

		child.x = 0;
		child.y = 0;

		if(direction === Component.DIRECTIONS.RIGHT){
			child.x = cnt.width;
		}

		if(direction === Component.DIRECTIONS.DOWN){
			child.y = (cnt.height)/cnt.scale.y;
		}
	}
}

Component.DIRECTIONS = {
	RIGHT: 0,
	DOWN: 1,
};
