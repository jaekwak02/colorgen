import Color from "color";

export const lerp = (a, b, t) => a + (b - a) * t;

export const clamp = (value, min = 0, max = 1) =>
  Math.round(Math.min(Math.max(value, min), max));

export const calculateColor = (base, delta) => {
  const baseColor = Color(base);
  const targetColor = Color(delta > 0 ? "white" : "black");
  const sign = Math.sign(delta);
  const newColor = baseColor.mix(targetColor, (sign * delta) / 100);
  return newColor.hex();
};

export const generateRandomString = () =>
  [...Array(10)].map((i) => (~~(Math.random() * 36)).toString(36)).join("");

export const getSavedThemes = () => {
  console.log("GETTING SAVED THEMES");

  const keys = [...Object.keys(localStorage)];
  const themes = keys
    .filter((key) => key.startsWith("COLOR-THEME:"))
    .map((key) => ({
      key: key.replace("COLOR-THEME:", ""),
      theme: JSON.parse(localStorage.getItem(key)),
    }))
    .sort((a, b) =>
      (a.theme.name || "Untitled Theme").localeCompare(
        b.theme.name || "Untitled Theme"
      )
    );

  return themes;
};

export const saveTheme = (theme, saveKey) => {
  // Saves a theme to localStorage.
  // If given a key, it will save the theme using the key. Otherwise, a new key will be generated.
  // Returns the save key.

  const key = saveKey || generateRandomString();

  localStorage.setItem(`COLOR-THEME:${key}`, JSON.stringify(theme));

  return key;
};

export const deleteTheme = (key) => {
  localStorage.removeItem(`COLOR-THEME:${key}`);
};

export const randomNumber = (min, max) => min + Math.random() * (max - min);

export const generateRandomColor = (generator) => {
  const h = randomNumber(generator?.hueMin || 0, generator?.hueMax || 360);
  const s = randomNumber(
    generator?.saturationMin || 15,
    generator?.saturationMax || 100
  );
  const l = randomNumber(
    generator?.lightnessMin || 15,
    generator?.lightnessMax || 85
  );

  return Color.hsl(h, s, l);
};

export const generateTheme = (scheme, withNeutral, baseColorHex, generator) => {
  const color = baseColorHex
    ? Color(baseColorHex)
    : generateRandomColor(generator);
  const colors = [];

  if (scheme === "monochromatic") {
    colors.push({ name: "color-primary", color: color.hex() });
  } else if (scheme === "analogous") {
    const leftColor = color.hue(color.hue() - 30);
    const rightColor = color.hue(color.hue() + 30);
    colors.push({ name: "color-secondary-left", color: leftColor.hex() });
    colors.push({ name: "color-primary", color: color.hex() });
    colors.push({ name: "color-secondary-right", color: rightColor.hex() });
  } else if (scheme === "complementary") {
    const complementColor = color.hue(color.hue() + 180);
    colors.push({ name: "color-primary", color: color.hex() });
    colors.push({ name: "color-complement", color: complementColor.hex() });
  } else if (scheme === "split-complementary") {
    const complementColor = color.hue(color.hue() + 180);
    const leftColor = complementColor.hue(complementColor.hue() - 30);
    const rightColor = complementColor.hue(complementColor.hue() + 30);
    colors.push({ name: "color-complement-left", color: leftColor.hex() });
    colors.push({ name: "color-primary", color: color.hex() });
    colors.push({ name: "color-complement-right", color: rightColor.hex() });
  } else if (scheme === "tetradic") {
    const color1 = color.hue(color.hue() + 60);
    const color2 = color.hue(color.hue() + 180);
    const color3 = color.hue(color.hue() + 240);
    colors.push({ name: "color-1", color: color.hex() });
    colors.push({ name: "color-2", color: color1.hex() });
    colors.push({ name: "color-3", color: color2.hex() });
    colors.push({ name: "color-4", color: color3.hex() });
  }

  if (withNeutral) {
    const neutralColor = Color().hsl(0, 0, color.lightness());
    colors.push({ name: "neutral", color: neutralColor.hex() });
  }

  return colors.map((color) => ({
    ...color,
    increment: 18,
    index: 3,
  }));
};

export const isValidColorHex = (input) => /^#[0-9a-f]{6}$/i.test(input);
