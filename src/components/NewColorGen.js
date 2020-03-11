import React, { useState } from "react";
import styled from "styled-components";
import color from "color";
import ColorGeneratorRow from "./ColorGeneratorRow";
import ColorPicker from "./ColorPicker";
import TextButton from "./TextButton"

const NewColorGen = () => {
  const [editingIndex, setEditingIndex] = useState(0);
  const [baseColors, setBaseColors] = useState([
    { color: "#FF2EBD", scheme: "analogous" },
    { color: "#9C999A", scheme: null },
  ]);
  const generatedColors = baseColors.map(c => generateColors(c.color));
  const generatedColorSchemes = baseColors
    .map(baseColor =>
      baseColor.scheme === "analogous"
        ? [
          color(baseColor.color).rotate(-30),
          color(baseColor.color).rotate(30)
        ]
        : baseColor.scheme === "complementary"
          ? [color(baseColor.color).rotate(180)]
          : baseColor.scheme === "split-complementary"
            ? [
              color(baseColor.color).rotate(150),
              color(baseColor.color).rotate(210)
            ]
            : baseColor.scheme === "triadic"
              ? [
                color(baseColor.color).rotate(-120),
                color(baseColor.color).rotate(120)
              ]
              : baseColor.scheme === "tetradic"
                ? [
                  color(baseColor.color).rotate(-180),
                  color(baseColor.color).rotate(-90),
                  color(baseColor.color).rotate(90)
                ]
                : []
    )
    .map(colors => colors.map(c => generateColors(c.hex())));

  return (
    <ElContainer>
      <h1>Color Theme Generator</h1>
      <ElColorsContainer>
        <ElColors>
          {baseColors.map((baseColor, colorIndex) => {
            const { colors, level } = generatedColors[colorIndex];
            const additionalRows = generatedColorSchemes[colorIndex];

            return (
              <ElColorRowGroup key={colorIndex}>
                <ColorGeneratorRow
                  colors={colors}
                  level={level}
                  index={colorIndex}
                  editingIndex={editingIndex}
                  setEditingIndex={setEditingIndex}
                />
                {additionalRows.map(({ colors, level }, rowIndex) => (
                  <ColorGeneratorRow
                    key={rowIndex}
                    colors={colors}
                    level={level}
                    showConnector
                  />
                ))}
              </ElColorRowGroup>
            );
          })}
          <div>
            <TextButton onClick={() =>
              setBaseColors([...baseColors, { color: "#ffffff", scheme: null }])
            }>
              Add Color
          </TextButton>
          </div>
        </ElColors>
        <ElColorPickerContainer>
          {editingIndex !== -1 && (
            <ColorPicker
              key={editingIndex}
              color={baseColors[editingIndex].color}
              setColor={hex => {
                const newBaseColors = [...baseColors];
                newBaseColors[editingIndex].color = hex;
                setBaseColors(newBaseColors);
              }}
              scheme={baseColors[editingIndex].scheme}
              setScheme={scheme => {
                baseColors[editingIndex].scheme = scheme;
                setBaseColors([...baseColors]);
              }}
            />
          )}
        </ElColorPickerContainer>
      </ElColorsContainer>
      <div>
        <div className="medium-header">Export</div>
        <ElExportContainer>
          {baseColors
            .reduce((acc, curr, index) => {
              acc.push(generatedColors[index]);
              acc.push(...generatedColorSchemes[index]);

              return acc;
            }, [])
            .map(({ colors }, index) =>
              colors
                .map(
                  (c, colorIndex) =>
                    `--color-${index + 1}-${colorIndex * 100 + 100}: ${c};`
                )
                .join("\n")
            )
            .join("\n\n")}
        </ElExportContainer>
      </div>
    </ElContainer>
  );
};

const ElContainer = styled.div`
  padding: 30px;
  max-width: 1600px;
  margin: auto;

  display: grid;
  grid-gap: 30px;
`;

const ElColorsContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 490px;
  grid-gap: 30px;
  min-height: 400px;
`;

const ElColors = styled.div`
  display: grid;
  grid-gap: 30px;
  align-content: start;
`;

const ElColorRowGroup = styled.div`
  display: grid;
  grid-gap: 30px;
  align-items: center;
`;

const ElColorPickerContainer = styled.div``;

const ElExportContainer = styled.div`
  background-color: #484848;
  font-family: "Roboto Mono";
  padding: 30px;
  line-height: 25px;
  white-space: pre;

  color: white;
`;

// const generateColors = baseColor => {
//   const colors = [baseColor];

//   while (colors.length < 9) {
//     const lastColor = colors[colors.length - 1];
//     const luminosity = color(lastColor).luminosity();
//     const proximityTo50 = (50 - Math.abs(50 - luminosity * 100)) / 50;
//     const scalingFactor = Math.pow(proximityTo50, 2);
//     console.log({ luminosity, scalingFactor });
//     const increment = 0.15;
//     const nextColor = color(lastColor).lighten(scalingFactor * increment);

//     colors.push(nextColor.hex());
//   }

//   return colors;
// };

// const generateColors = baseColor => {
//   const c = color(baseColor);
//   console.log("luminosity", c.luminosity());
//   console.log("lightness", c.lightness());
//   console.log("hex", c.hex());

//   const standardRange = [5, 10, 20, 30, 40, 50, 60, 70, 80, 85, 90, 93, 96];

//   const luminosity = c.lightness();
//   const ROOT = 1.25;
//   const luminositySqrt = Math.pow(luminosity, 1 / ROOT);
//   const luminositySqrtStr = luminositySqrt.toString();
//   const level = Number(luminositySqrtStr[2]);
//   const values = standardRange.map(x => x / 100);

//   const colorRange = [c.hex()];
//   let darker = color(c);
//   let darkerLimit = 0;
//   while (darker.luminosity() > 0.0 && darkerLimit < 100) {
//     darkerLimit++;
//     darker = darker.darken(0.04);
//     colorRange.unshift(darker.hex());
//   }
//   let lighter = color(c);
//   let lighterLimit = 0;
//   while (lighter.luminosity() < 0.99 && lighterLimit < 100) {
//     lighterLimit++;
//     lighter = lighter.lighten(0.04);
//     colorRange.push(lighter.hex());
//   }

//   console.log(
//     "lightness",
//     colorRange.map(c => color(c).luminosity())
//   );

//   const closest = standardRange.reduce((prev, curr) =>
//     Math.abs(curr - luminosity * 100) < Math.abs(prev - luminosity * 100)
//       ? curr
//       : prev
//   );
//   const closestIndex = standardRange.indexOf(closest);
//   const offset = luminosity * 100 - closest;
//   const farthestDistance = Math.min(closestIndex, 9 - closestIndex);

//   const range = values.map(x => Math.pow(x, ROOT));
//   console.log(range);
//   const colors = range.map((lightness, index) => {
//     return colorRange.reduce((prev, curr) =>
//       Math.abs(color(curr).lightness() - lightness) <
//       Math.abs(color(prev).lightness() - lightness)
//         ? curr
//         : prev
//     );
//   });

//   // return colors;

//   return colorRange;
// };

const generateColors = baseColor => {
  const c = color(baseColor);

  const luminosity = c.luminosity();
  const ROOT = 1.5;
  const luminositySqrt = Math.pow(luminosity, 1 / ROOT);
  const luminositySqrtStr = luminositySqrt.toString();
  const level = Number(luminositySqrtStr[2]);

  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(x =>
    Number(`0.${x}${luminositySqrtStr.slice(3)}`)
  );

  const colorRange = [c.hex()];
  let darker = color(c);
  let darkerLimit = 0;
  while (darker.luminosity() > 0.01 && darkerLimit < 100) {
    darkerLimit++;
    darker = darker.darken(0.02);
    colorRange.unshift(darker.hex());
  }
  let lighter = color(c);
  let lighterLimit = 0;
  while (lighter.luminosity() < 0.99 && lighterLimit < 100) {
    lighterLimit++;
    lighter = lighter.lighten(0.02);
    colorRange.push(lighter.hex());
  }

  const range = values.map(x => Math.pow(x, ROOT));
  const colors = range.map((luminosity, index) => {
    return colorRange.reduce((prev, curr) =>
      Math.abs(color(curr).luminosity() - luminosity) <
        Math.abs(color(prev).luminosity() - luminosity)
        ? curr
        : prev
    );
  });

  return { colors, level };
};

export default NewColorGen;
