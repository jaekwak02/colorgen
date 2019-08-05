const toPaddedHexString = (num, len) => {
	const str = num.toString(16);
	return '0'.repeat(len - str.length) + str;
};

const numbersToHex = (r, g, b) => `#${toPaddedHexString(r, 2)}${toPaddedHexString(g, 2)}${toPaddedHexString(b, 2)}`;

const clamp = (value, min = 0, max = 1) => Math.round(Math.min(Math.max(value, min), max));

const clamp0to255 = value => Math.round(Math.min(Math.max(value, 0), 255));

const lerp = (a, b, t) => a + (b - a) * t;

export const RGBToHSL = rgb => {
	// Make r, g, and b fractions of 1
	const r = (rgb.r /= 255);
	const g = (rgb.g /= 255);
	const b = (rgb.b /= 255);

	// Find greatest and smallest channel values
	let cmin = Math.min(r, g, b);
	let cmax = Math.max(r, g, b);
	let delta = cmax - cmin;
	let h = 0;
	let s = 0;
	let l = 0;

	// Calculate hue
	// No difference
	if (delta == 0) h = 0;
	// Red is max
	else if (cmax == r) h = ((g - b) / delta) % 6;
	// Green is max
	else if (cmax == g) h = (b - r) / delta + 2;
	// Blue is max
	else h = (r - g) / delta + 4;

	h = Math.round(h * 60);

	// Make negative hues positive behind 360°
	if (h < 0) h += 360;

	// Calculate lightness
	l = (cmax + cmin) / 2;

	// Calculate saturation
	s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

	// Multiply l and s by 100
	s = Math.abs(s * 100);
	l = Math.abs(l * 100);

	return { h, s, l };
};

export const HSLToRGB = hsl => {
	// Must be fractions of 1
	const h = hsl.h;
	const s = hsl.s / 100;
	const l = hsl.l / 100;

	let c = (1 - Math.abs(2 * l - 1)) * s,
		x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
		m = l - c / 2,
		r = 0,
		g = 0,
		b = 0;

	if (0 <= h && h < 60) {
		r = c;
		g = x;
		b = 0;
	} else if (60 <= h && h < 120) {
		r = x;
		g = c;
		b = 0;
	} else if (120 <= h && h < 180) {
		r = 0;
		g = c;
		b = x;
	} else if (180 <= h && h < 240) {
		r = 0;
		g = x;
		b = c;
	} else if (240 <= h && h < 300) {
		r = x;
		g = 0;
		b = c;
	} else if (300 <= h && h < 360) {
		r = c;
		g = 0;
		b = x;
	}
	r = Math.round((r + m) * 255);
	g = Math.round((g + m) * 255);
	b = Math.round((b + m) * 255);

	return { r, g, b };
};

export const HSLToHex = hsl => {
	const rgb = HSLToRGB(hsl);

	return RGBToHex(rgb);
};

export const getTextDark = color => {
	const rgb = hexToRGB(color);
	return rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114 > 186;
};

export const hexToRGB = hex => {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);

	return { r, g, b };
};

export const hexToHSL = hex => {
	const rgb = hexToRGB(hex);
	return RGBToHSL(rgb);
};

export const RGBToHex = rgb => numbersToHex(rgb.r, rgb.g, rgb.b);

export const generateHue = (color, gain) => {
	const r0 = color.rgb.r;
	const g0 = color.rgb.g;
	const b0 = color.rgb.b;

	const mult = Math.abs(gain / 100);
	const target = gain > 0 ? 255 : 0;

	const r = clamp0to255(lerp(r0, target, mult));
	const g = clamp0to255(lerp(g0, target, mult));
	const b = clamp0to255(lerp(b0, target, mult));

	return RGBToHex({ r, g, b });
};

export const combineRGB = (tarhexToRGB, addedRGB, strength) => {
	const totalAdd = addedRGB.r + addedRGB.g + addedRGB.b;
	const averageAdd = clamp0to255((totalAdd / 3) * strength);
	const r = clamp0to255(tarhexToRGB.r + addedRGB.r * strength - averageAdd);
	const g = clamp0to255(tarhexToRGB.g + addedRGB.g * strength - averageAdd);
	const b = clamp0to255(tarhexToRGB.b + addedRGB.b * strength - averageAdd);

	return numbersToHex(r, g, b);
};

export const generateRandomString = [...Array(10)].map(i => (~~(Math.random() * 36)).toString(36)).join('');
