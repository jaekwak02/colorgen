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
