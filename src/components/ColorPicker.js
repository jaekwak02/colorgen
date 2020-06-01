import React, { useReducer, useEffect } from "react";
import styled, { css } from "styled-components";
import color from "color";
import MarkerContainer from "./MarkerContainer";
import TextInput from "./TextInput";
import { lerp } from "../utils/utils";

const ColorPicker = ({ color: defaultColor = "#ff0000", setColor }) => {
  const size = 400;
  const sizeHue = 60;

  const [state, dispatch] = useReducer(
    (state, action) => {
      const [type, data] = action;

      switch (type) {
        case "COLOR_INPUT": {
          state.colorInput = data;

          if (/^#[0-9a-f]{6}$/i.test(state.colorInput)) {
            const {
              defaultHuePosition,
              defaultHue,
              defaultMarkerPosition,
            } = getParameters(state.colorInput, size);

            state.pickerColor = defaultHue;
            state.huePosition = defaultHuePosition;
            state.markerPosition = defaultMarkerPosition;
            state.selectedColor = getSelectedColor(state, size);
          }

          return { ...state };
        }
        case "SET_MARKER_POSITION": {
          state.markerPosition = data;
          state.selectedColor = getSelectedColor(state, size);
          state.colorInput = state.selectedColor;

          return { ...state };
        }
        case "SET_HUE_POSITION": {
          const hue = color("#ff0000")
            .rotate((data[1] / size) * 360)
            .hex();

          state.huePosition = data;
          state.pickerColor = hue;
          state.selectedColor = getSelectedColor(state, size);
          state.colorInput = state.selectedColor;

          return { ...state };
        }
        default: {
          throw new Error(`${type} is not a supported action.`);
        }
      }
    },
    null,
    () => {
      const {
        defaultHuePosition,
        defaultHue,
        defaultMarkerPosition,
      } = getParameters(defaultColor, size);

      return {
        selectedColor: defaultColor,
        colorInput: defaultColor,
        pickerColor: defaultHue,
        markerPosition: defaultMarkerPosition,
        huePosition: [0, defaultHuePosition],
      };
    }
  );

  const {
    selectedColor,
    colorInput,
    pickerColor,
    markerPosition,
    huePosition,
  } = state;

  // Propagate any changes to the parent
  useEffect(() => {
    if (defaultColor !== selectedColor) {
      setColor(selectedColor);
    }
  }, [selectedColor]); // eslint-disable-line

  return (
    <ElColorPickerContainer>
      <ElColorPickerTopRow>
        <MarkerContainer
          position={markerPosition}
          setPosition={(p) => dispatch(["SET_MARKER_POSITION", p])}
          width={size}
          height={size}
          style={{
            backgroundColor: color(pickerColor),
          }}
        >
          <ElColorPickerBackground
            style={{
              background: `linear-gradient(to left, transparent, white)`,
            }}
          />
          <ElColorPickerBackground
            style={{
              background: "linear-gradient(to top, black, transparent)",
            }}
          />
          <ElColorPickerMarker
            style={{
              left: `${markerPosition[0] / 4}%`,
              top: `${markerPosition[1] / 4}%`,
              backgroundColor: selectedColor,
            }}
          />
        </MarkerContainer>
        <MarkerContainer
          position={huePosition}
          setPosition={(p) => {
            dispatch(["SET_HUE_POSITION", p]);
          }}
          width={sizeHue}
          height={size}
          style={{
            background:
              "linear-gradient(to bottom, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
          }}
        >
          <ElColorPickerHueMarker style={{ top: `${huePosition[1] / 4}%` }} />
        </MarkerContainer>
      </ElColorPickerTopRow>
      <ElColorPickerBottomRow>
        <div>
          <TextInput
            value={colorInput}
            onChange={(e) => dispatch(["COLOR_INPUT", e.target.value])}
          />
        </div>
      </ElColorPickerBottomRow>
    </ElColorPickerContainer>
  );
};

const getSelectedColor = (state, size) => {
  const x = state.markerPosition[0] / size;
  const y = state.markerPosition[1] / size;

  const rgb = color(state.pickerColor).rgb().array();
  const r = lerp(lerp(255, rgb[0], x), 0, y);
  const g = lerp(lerp(255, rgb[1], x), 0, y);
  const b = lerp(lerp(255, rgb[2], x), 0, y);
  const selectedColor = color([r, g, b]).hex();

  return selectedColor;
};

const getParameters = (baseColor, size) => {
  const defaultHuePosition = (color(baseColor).hue() / 360) * size;
  const defaultHue = color("#ff0000")
    .rotate((defaultHuePosition / size) * 360)
    .hex();

  const hueRGB = color(defaultHue).rgb().array();
  const base = color(baseColor).rgb().array();
  const max = Math.max(...base);
  const y = size - (max / 255) * size;
  const baseSaturated = base.map((x) => (x * 255) / max);

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
    defaultMarkerPosition: [x, y],
  };
};

const ElColorPickerContainer = styled.div`
  display: grid;
  grid-gap: 15px;
  align-items: flex-start;
`;

const ElColorPickerTopRow = styled.div`
  display: grid;
  grid-gap: 30px;
  grid-auto-flow: column;
  align-items: flex-start;
  justify-items: flex-start;
`;

const ElColorPickerBottomRow = styled.div`
  display: grid;
  grid-gap: 30px;
  grid-auto-flow: column;
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

export default ColorPicker;
