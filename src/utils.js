import Color from "color";

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

export const generateRandomColor = () => {
  const h = Math.random() * 360;
  const s = 15 + Math.random() * 85;
  const l = 15 + Math.random() * 70;

  return Color.hsl(h, s, l);
};

export const generateTheme = (scheme, withNeutral) => {
  const color = generateRandomColor();
  const colors = [];

  if (scheme === "monochromatic") {
    colors.push(color.hex());
  } else if (scheme === "analogous") {
    const leftColor = color.hue(color.hue() - 30);
    const rightColor = color.hue(color.hue() + 30);
    colors.push(leftColor.hex());
    colors.push(color.hex());
    colors.push(rightColor.hex());
  } else if (scheme === "complementary") {
    const complementColor = color.hue(color.hue() + 180);
    colors.push(color.hex());
    colors.push(complementColor.hex());
  } else if (scheme === "split-complementary") {
    const complementColor = color.hue(color.hue() + 180);
    const leftColor = complementColor.hue(complementColor.hue() - 30);
    const rightColor = complementColor.hue(complementColor.hue() + 30);
    colors.push(leftColor.hex());
    colors.push(color.hex());
    colors.push(rightColor.hex());
  } else if (scheme === "tetradic") {
    const color1 = color.hue(color.hue() + 60);
    const color2 = color.hue(color.hue() + 180);
    const color3 = color.hue(color.hue() + 240);
    colors.push(color.hex());
    colors.push(color1.hex());
    colors.push(color2.hex());
    colors.push(color3.hex());
  }

  if (withNeutral) {
    const neutralColor = Color().hsl(0, 0, color.lightness());
    colors.push(neutralColor.hex());
  }

  return colors;
};
