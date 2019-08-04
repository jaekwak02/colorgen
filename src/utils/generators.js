import { Color } from '../classes/Color';

const randomNumber = (min = 0, max = 100) => min + Math.floor(Math.random() * (max - min));

const randomHue = () => clampHue(Math.floor(Math.random() * 360));

const randomSaturation = (min, max) => min + Math.floor(Math.random() * (max - min));

const randomLightness = (min, max) => min + Math.floor(Math.random() * (max - min));

const clampHue = hue => (hue < 0 ? hue + 360 : hue % 360);

export const generateMonochromatic = () => {
	const h = randomHue();
	const s = randomSaturation(50, 100);
	const l = randomLightness(50, 90);

	return [new Color({ h, s, l })];
};

export const generateAnalagous = () => {
	const c2 = new Color({
		h: randomHue(),
		s: randomSaturation(50, 100),
		l: randomLightness(50, 70)
	});

	const deviance = randomNumber(30, 60);
	const s = randomNumber(20, 50);
	const l = randomNumber(40, 90);

	const c1 = new Color({
		h: clampHue(c2.hsl.h - deviance),
		s,
		l
	});
	const c3 = new Color({
		h: clampHue(c2.hsl.h + deviance),
		s,
		l
	});

	return [c1, c2, c3];
};

export const generateComplementary = () => {
	const h0 = randomHue();
	const h1 = clampHue(h0 + 180);

	const s = 30 + Math.floor(Math.random() * 40);

	return [new Color({ h: h0, s, l: 30 }), new Color({ h: h1, s, l: 60 })];
};

export const generateSplitComplementary = () => {
	const h0 = randomHue();

	const deviance = 60;
	const h1 = clampHue(h0 + 180 - deviance);
	const h2 = clampHue(h0 + 180 + deviance);

	const s = randomNumber(20, 50);
	const l = randomNumber(40, 90);

	return [
		new Color({
			h: h0,
			s: randomNumber(50, 90),
			l: randomNumber(50, 70)
		}),
		new Color({
			h: h1,
			s,
			l
		}),
		new Color({
			h: h2,
			s,
			l
		})
	];
};

export const generateTetradic = () => {
	const h0 = randomHue();
	const h1 = clampHue(h0 + 180);

	const h2 = randomNumber(-1, 1) > 0 ? clampHue(h0 + randomNumber(30, 90)) : clampHue(h0 + randomNumber(-30, -90));
	const h3 = clampHue(h2 + 180);

	return [
		new Color({
			h: h0,
			s: randomNumber(50, 90),
			l: randomNumber(40, 90)
		}),
		new Color({
			h: h1,
			s: randomNumber(10, 20),
			l: randomNumber(40, 90)
		}),
		new Color({
			h: h2,
			s: randomNumber(10, 20),
			l: randomNumber(40, 90)
		}),
		new Color({
			h: h3,
			s: randomNumber(10, 20),
			l: randomNumber(40, 90)
		})
	];
};
