import { Color } from '../classes/Color';

const randomNumber = (min = 0, max = 100) => min + Math.floor(Math.random() * (max - min));

const randomHue = () => clampHue(Math.floor(Math.random() * 360));

const randomSaturation = (min, max) => min + Math.floor(Math.random() * (max - min));

const randomLightness = (min, max) => min + Math.floor(Math.random() * (max - min));

const clampHue = hue => (hue < 0 ? hue + 360 : hue % 360);

export const generateMonochromatic = baseColor => {
	const c0 = baseColor
		? new Color(baseColor)
		: new Color({
				h: randomHue(),
				s: randomNumber(60, 100),
				l: randomNumber(50, 90)
		  });

	const c1 = new Color({
		h: c0.hsl.h,
		s: randomNumber(15, 50),
		l: randomNumber(30, 70)
	});

	return [c0, c1];
};

export const generateAnalagous = baseColor => {
	const c2 = baseColor
		? new Color(baseColor)
		: new Color({
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

export const generateComplementary = baseColor => {
	const c0 = baseColor
		? new Color(baseColor)
		: new Color({
				h: randomHue(),
				s: randomNumber(30, 70),
				l: randomNumber(30, 70)
		  });

	const c1 = new Color({
		h: clampHue(c0.hsl.h + 180),
		s: randomNumber(30, 70),
		l: randomNumber(30, 70)
	});

	return [c0, c1];
};

export const generateSplitComplementary = baseColor => {
	const c0 = baseColor
		? new Color(baseColor)
		: new Color({
				h: randomHue(),
				s: randomNumber(50, 90),
				l: randomNumber(50, 70)
		  });

	const deviance = 60;
	const h1 = clampHue(c0.hsl.h + 180 - deviance);
	const h2 = clampHue(c0.hsl.h + 180 + deviance);

	const s = randomNumber(20, 50);
	const l = randomNumber(40, 90);

	return [
		c0,
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

export const generateTetradic = baseColor => {
	const c0 = baseColor
		? new Color(baseColor)
		: new Color({
				h: randomHue(),
				s: randomNumber(50, 90),
				l: randomNumber(40, 90)
		  });
	const h1 = clampHue(c0.hsl.h + 180);
	const h2 = randomNumber(-1, 1) > 0 ? clampHue(c0.hsl.h + randomNumber(30, 90)) : clampHue(c0.hsl.h + randomNumber(-30, -90));
	const h3 = clampHue(h2 + 180);

	return [
		c0,
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
