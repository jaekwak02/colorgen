import { RGBToHSL, RGBToHex, HSLToRGB, HSLToHex, hexToRGB, hexToHSL } from '../utils/utils';

export class Color {
	_private = {}; // Do not use outside

	constructor(initial) {
		this._private.rgb = { r: 0, g: 0, b: 0 };
		this._private.hsl = { h: 0, s: 0, l: 0 };
		this._private.hex = '#000000';

		if (initial.hasOwnProperty('r') && initial.hasOwnProperty('g') && initial.hasOwnProperty('b')) {
			this._private.rgb = initial;
			this._private.hsl = RGBToHSL(initial);
			this._private.hex = RGBToHex(initial);
		} else if (initial.hasOwnProperty('h') && initial.hasOwnProperty('s') && initial.hasOwnProperty('l')) {
			this._private.rgb = HSLToRGB(initial);
			this._private.hsl = initial;
			this._private.hex = HSLToHex(initial);
		} else if (typeof initial === 'string') {
			this._private.rgb = hexToRGB(initial);
			this._private.hsl = hexToHSL(initial);
			this._private.hex = initial;
		}
	}

	get rgb() {
		return this._private.rgb;
	}

	get hsl() {
		return this._private.hsl;
	}

	get hex() {
		return this._private.hex;
	}

	setColor(initial) {
		if (initial.hasOwnProperty('r') && initial.hasOwnProperty('g') && initial.hasOwnProperty('b')) {
			this._private.rgb = initial;
			this._private.hsl = RGBToHSL(initial);
			this._private.hex = RGBToHex(initial);
		} else if (initial.hasOwnProperty('h') && initial.hasOwnProperty('s') && initial.hasOwnProperty('l')) {
			this._private.rgb = HSLToRGB(initial);
			this._private.hsl = initial;
			this._private.hex = HSLToHex(initial);
		} else if (typeof initial === 'string') {
			this._private.rgb = hexToRGB(initial);
			this._private.hsl = hexToHSL(initial);
			this._private.hex = initial;
		}
	}
}
