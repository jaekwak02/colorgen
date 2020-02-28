import React from "react";
import styled from "styled-components";
import {
  hexToRGB,
  clamp0to255,
  RGBToHex,
  lerp,
  getTextDark,
  hexToHSL,
  HSLToHex
} from "../utils/utils";

const NewColorGen = () => {
  // ef44ff	d73de6	bf36cc	a730b3	8f2999	782280	601b66	48144c	300e33	180719	000000
  // ef44ff	f157ff	f269ff	f47cff	f58fff	f7a2ff	f9b4ff	fac7ff	fcdaff	fdecff	ffffff

  const baseColor = "#ef44ff";
  // const colors = [];
  // [...new Array(9)].reverse().forEach((_, i) => {
  //   const rgb = hexToRGB(baseColor);
  //   rgb.r = clamp0to255(lerp(rgb.r, 0, (i + 1) / 10));
  //   rgb.g = clamp0to255(lerp(rgb.g, 0, (i + 1) / 10));
  //   rgb.b = clamp0to255(lerp(rgb.b, 0, (i + 1) / 10));
  //   colors.unshift(RGBToHex(rgb));
  // });

  // colors.push(baseColor);

  // [...new Array(9)].forEach((_, i) => {
  //   const rgb = hexToRGB(baseColor);
  //   rgb.r = clamp0to255(lerp(rgb.r, 255, (i + 1) / 10));
  //   rgb.g = clamp0to255(lerp(rgb.g, 255, (i + 1) / 10));
  //   rgb.b = clamp0to255(lerp(rgb.b, 255, (i + 1) / 10));
  //   colors.push(RGBToHex(rgb));
  // });

  const baseHSL = hexToHSL(baseColor);
  console.log({ baseHSL });

  const colors = [20, 30, 40, 48, 60, 70, 80, 88, 95].map(light =>
    HSLToHex({ ...baseHSL, l: light })
  );

  return (
    <ElContainer>
      <ElColorOptions>
        {colors.map((color, colorIndex) => (
          <ElColor
            key={colorIndex}
            style={{
              backgroundColor: color,
              color: getTextDark(color) ? "black" : "white"
            }}
          >
            {color}
          </ElColor>
        ))}
      </ElColorOptions>
      <ElExportContainer>
        {colors.map((color, colorIndex) => (
          <div key={colorIndex}>
            --var-color-accent-{colorIndex * 100 + 100}: {color};
          </div>
        ))}
      </ElExportContainer>
    </ElContainer>
  );
};

const ElContainer = styled.div`
  padding: 30px;

  display: grid;
  grid-gap: 30px;
`;

const ElColorOptions = styled.div`
  display: grid;
`;

const ElColor = styled.div`
  height: 50px;

  display: grid;
  align-items: center;
  justify-items: center;
`;

const ElExportContainer = styled.div`
  background-color: #484848;
  font-family: "Courier New", Courier, monospace;
  padding: 30px;

  color: white;
`;

export default NewColorGen;
