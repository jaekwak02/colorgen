import React, { useState, useEffect, useMemo } from "react";
import styled, { css } from "styled-components";
import color from "color";
import MarkerContainer from "./MarkerContainer";
import { lerp } from "../utils/utils";

const ColorPicker = ({
  color: defaultColor = "#ff0000",
  setColor,
  scheme,
  setScheme
}) => {
  const {
    defaultHuePosition,
    defaultHue,
    defaultMarkerPosition
  } = useMemo(() => {
    const defaultHuePosition = (color(defaultColor).hue() / 360) * 400;
    const defaultHue = color("#ff0000")
      .rotate((defaultHuePosition / 400) * 360)
      .hex();
    console.log({ defaultHue, defaultHuePosition });

    // const xxx = color(defaultHue)
    //   .rgb()
    //   .array();
    // const yyy = color(defaultColor)
    //   .rgb()
    //   .array();
    // const sr = 1 - (xxx[0] === 0 ? 1 : yyy[0] / xxx[0]);
    // const sg = 1 - (xxx[1] === 0 ? 1 : yyy[1] / xxx[1]);
    // const sb = 1 - (xxx[2] === 0 ? 1 : yyy[2] / xxx[2]);
    // const sats = [sr, sg, sb].filter(x => x !== 0);
    // const defaultSaturation = Math.abs(
    //   (sats.reduce((a, b) => a + b, 0) / sats.length) * 400
    // );

    // 1 Saturate Base Color
    const hueRGB = color(defaultHue)
      .rgb()
      .array();
    const base = color(defaultColor)
      .rgb()
      .array();
    const max = Math.max(...base);
    const y = 400 - (max / 255) * 400;
    const baseSaturated = base.map(x => (x * 255) / max);

    const toWhite =
      baseSaturated[0] !== 255
        ? (baseSaturated[0] - hueRGB[0]) / (255 - hueRGB[0])
        : baseSaturated[1] !== 255
        ? (baseSaturated[1] - hueRGB[1]) / (255 - hueRGB[1])
        : (baseSaturated[2] - hueRGB[2]) / (255 - hueRGB[2]);

    const x = 400 - toWhite * 400;

    return {
      defaultHuePosition,
      defaultHue,
      defaultMarkerPosition: [x, y]
    };
  }, []);

  const [pickerColor, setPickerColor] = useState(defaultHue);
  const [markerPosition, setMarkerPosition] = useState(defaultMarkerPosition);
  const [huePosition, setHuePosition] = useState([0, defaultHuePosition]);
  const x = markerPosition[0] / 400;
  const y = markerPosition[1] / 400;

  const hue = color("#ff0000")
    .rotate((huePosition[1] / 400) * 360)
    .hex();

  const rgb = color(pickerColor)
    .rgb()
    .array();
  const r = lerp(lerp(255, rgb[0], x), 0, y);
  const g = lerp(lerp(255, rgb[1], x), 0, y);
  const b = lerp(lerp(255, rgb[2], x), 0, y);
  const selectedColor = color([r, g, b]).hex();

  useEffect(() => setPickerColor(hue), [hue, setPickerColor]);

  useEffect(() => {
    if (defaultColor !== selectedColor) {
      const timeout = setTimeout(() => setColor(selectedColor), 100);

      return () => clearTimeout(timeout);
    }
  }, [defaultColor, selectedColor, setColor]);

  return (
    <ElColorPickerContainer>
      <MarkerContainer
        position={markerPosition}
        setPosition={setMarkerPosition}
        width={400}
        height={400}
        style={{
          backgroundColor: color(pickerColor)
        }}
      >
        <ElColorPickerBackground
          style={{
            background: `linear-gradient(to left, transparent, white)`
          }}
        />
        <ElColorPickerBackground
          style={{
            background: "linear-gradient(to top, black, transparent)"
          }}
        />
        <ElColorPickerMarker
          style={{
            left: `${markerPosition[0] / 4}%`,
            top: `${markerPosition[1] / 4}%`,
            backgroundColor: selectedColor
          }}
        />
      </MarkerContainer>
      <MarkerContainer
        position={huePosition}
        setPosition={setHuePosition}
        width={60}
        height={400}
        style={{
          background:
            "linear-gradient(to bottom, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)"
        }}
      >
        <ElColorPickerHueMarker style={{ top: `${huePosition[1] / 4}%` }} />
      </MarkerContainer>
      <ElColorSchemeOptions>
        {[
          { label: "None", value: null },
          { label: "Analogous", value: "analogous" },
          { label: "Complementary", value: "complementary" },
          { label: "Split Complementary", value: "split-complementary" },
          { label: "Triadic", value: "triadic" },
          { label: "Tetradic", value: "tetradic" }
        ].map((o, index) => (
          <ElColorSchemeOption
            key={index}
            active={scheme === o.value}
            onClick={() => setScheme(o.value)}
          >
            {o.label}
          </ElColorSchemeOption>
        ))}
      </ElColorSchemeOptions>
    </ElColorPickerContainer>
  );
};

const ElColorPickerContainer = styled.div`
  display: grid;
  grid-gap: 30px;
  grid-template-columns: auto auto auto 1fr;
  align-items: flex-start;
  justify-content: flex-start;
`;

const ElColorPickerBackground = styled.div`
  position: absolute;
  top: 0%;
  left: 0%;
  bottom: 0%;
  right: 0%;

  pointer-events: none;
`;

const ElColorPickerMarker = styled.div`
  position: absolute;
  height: 16px;
  width: 16px;
  transform: translateX(-50%) translateY(-50%);
  border: 2px solid white;
  background-color: transparent;
  border-radius: 10px;

  pointer-events: none;
`;

const ElColorPickerHueMarker = styled.div`
  position: absolute;
  width: calc(100% + 10px);
  height: 2px;
  transform: translateX(-5px) translateY(-1px);
  background-color: white;
`;

const ElColorSchemeOptions = styled.div`
  display: grid;
  grid-gap: 10px;
`;

const ElColorSchemeOption = styled.div`
  height: 30px;
  padding: 0px 15px;
  background-color: var(--color-neutral-400);
  border: 1px solid var(--color-neutral-500);

  color: var(--color-neutral-500);

  display: grid;
  justify-items: center;
  align-items: center;

  cursor: pointer;

  &:hover {
    background-color: var(--color-neutral-500);
    background-color: var(--color-neutral-600);
    color: white;
  }

  ${props =>
    props.active &&
    css`
      background-color: var(--color-neutral-500);
      background-color: var(--color-neutral-600);
      color: white;
    `}
`;

export default ColorPicker;
