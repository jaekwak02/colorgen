import React, { useState, useEffect, useMemo } from "react";
import styled, { css } from "styled-components";
import color from "color";
import MarkerContainer from "./MarkerContainer";
import TextInput from "./TextInput"
import { lerp } from "../utils/utils";

const ColorPicker = ({
  color: defaultColor = "#ff0000",
  setColor,
  scheme,
  setScheme
}) => {
  const size = 400;
  const sizeHue = 60;

  const {
    defaultHuePosition,
    defaultHue,
    defaultMarkerPosition
  } = useMemo(() => getParameters(defaultColor, size), []);

  const [s, setS] = useState({
    colorInput: defaultColor,
    pickerColor: defaultHue,
    markerPosition: defaultMarkerPosition,
    huePosition: [0, defaultHuePosition],
  });

  const {
    colorInput,
    pickerColor,
    markerPosition,
    huePosition,
  } = s

  const x = markerPosition[0] / size;
  const y = markerPosition[1] / size;

  const rgb = color(pickerColor)
    .rgb()
    .array();
  const r = lerp(lerp(255, rgb[0], x), 0, y);
  const g = lerp(lerp(255, rgb[1], x), 0, y);
  const b = lerp(lerp(255, rgb[2], x), 0, y);
  const selectedColor = color([r, g, b]).hex();

  useEffect(() => {
    if (defaultColor !== selectedColor) {
      const timeout = setTimeout(() => {
        setColor(selectedColor);

        if (selectedColor.toLowerCase() !== colorInput.toLowerCase()) {
          setS(s => ({ ...s, colorInput: selectedColor }));
        }
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [defaultColor, selectedColor, setColor, colorInput]);

  return (
    <ElColorPickerContainer>
      <ElColorPickerTopRow>
        <MarkerContainer
          position={markerPosition}
          setPosition={p => setS({ ...s, markerPosition: p })}
          width={size}
          height={size}
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
          setPosition={p => {
            const hue = color("#ff0000")
              .rotate((p[1] / size) * 360)
              .hex();
            setS({
              ...s,
              huePosition: p,
              pickerColor: hue
            });
          }}
          width={sizeHue}
          height={size}
          style={{
            background:
              "linear-gradient(to bottom, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)"
          }}
        >
          <ElColorPickerHueMarker style={{ top: `${huePosition[1] / 4}%` }} />
        </MarkerContainer>
      </ElColorPickerTopRow>
      <ElColorPickerBottomRow>
        <div>
          <TextInput value={colorInput} onChange={(e) => {
            const newColorInput = e.target.value;

            if (/^#[0-9a-f]{6}$/i.test(newColorInput)) {
              const {
                defaultHuePosition,
                defaultHue,
                defaultMarkerPosition
              } = getParameters(newColorInput, size);

              console.log({
                defaultHuePosition,
                defaultHue,
                defaultMarkerPosition
              });

              setS({
                colorInput: newColorInput,
                pickerColor: defaultHue,
                huePosition: defaultHuePosition,
                markerPosition: defaultMarkerPosition,
              })
            } else {
              setS({ ...s, colorInput: newColorInput })
            }
          }} />
        </div>
        <div>
          <div className="small-header">
            Color Scheme
          </div>
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
        </div>
      </ElColorPickerBottomRow>
    </ElColorPickerContainer>
  );
};

const getParameters = (baseColor, size) => {
  const defaultHuePosition = (color(baseColor).hue() / 360) * size;
  const defaultHue = color("#ff0000")
    .rotate((defaultHuePosition / size) * 360)
    .hex();

  const hueRGB = color(defaultHue)
    .rgb()
    .array();
  const base = color(baseColor)
    .rgb()
    .array();
  const max = Math.max(...base);
  const y = size - (max / 255) * size;
  const baseSaturated = base.map(x => (x * 255) / max);

  const toWhite =
    baseSaturated[0] !== 255
      ? (baseSaturated[0] - hueRGB[0]) / (255 - hueRGB[0])
      : baseSaturated[1] !== 255
        ? (baseSaturated[1] - hueRGB[1]) / (255 - hueRGB[1])
        : (baseSaturated[2] - hueRGB[2]) / (255 - hueRGB[2]);

  const x = size - toWhite * size;

  return {
    defaultHuePosition,
    defaultHue,
    defaultMarkerPosition: [x, y]
  };
}

const ElColorPickerContainer = styled.div`
  display: grid;
  grid-gap: 30px;
  align-items: flex-start;
`;

const ElColorPickerTopRow = styled.div`
  display: grid;
  grid-gap: 30px;
  grid-auto-flow: column;
  align-items: flex-start;
  justify-items: flex-start;
`

const ElColorPickerBottomRow = styled.div`
  display: grid;
  grid-gap: 30px;
  grid-auto-flow: column;
`

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
