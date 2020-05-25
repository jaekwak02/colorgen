import React, { useState, useRef } from "react";
import Color from "color";
import ColorRow from "../components/ColorRow";
import ColorCell from "../components/ColorCell";
import ColorDotSecondary from "../components/ColorDotSecondary";
import ColorDotLayout from "../components/ColorDotLayout";
import SlideOutPanel from "../components/SlideOutPanel";
import ColorPicker from "../components/ColorPicker";
import PageLayout from "../components/PageLayout";
import CodeBlock from "../components/CodeBlock";
import TextButton from "../components/TextButton";

const DEFAULT_SEGMENTS = [-80, -60, -40, -20, 0, 20, 40, 60, 80];

const HomePage = () => {
  const exportRef = useRef();

  const [editingIndex, setEditingIndex] = useState(-1);

  const [state, setState] = useState({
    segmentLength: 9,
    colors: [
      {
        color: "#0073B8",
        name: "primary",
        increment: 20,
        index: 4,
        segments: [...DEFAULT_SEGMENTS],
      },
      {
        color: "#8B11A8",
        name: "secondary",
        increment: 20,
        index: 4,
        segments: [...DEFAULT_SEGMENTS],
      },
      {
        color: "#888888",
        name: "neutral",
        increment: 20,
        index: 4,
        segments: [...DEFAULT_SEGMENTS],
      },
    ],
  });

  const colorSegments = state.colors.map((color) => {
    return [...new Array(9)].map((_, i) => (i - color.index) * color.increment);
  });

  const exportText = (() => {
    let s = "";

    state.colors.forEach((color, colorIndex) => {
      colorSegments[colorIndex].forEach((segmentDelta, segmentIndex) => {
        s += `--color-${color.name}-${(segmentIndex + 1) * 100}: ${Color(
          color.color
        )
          .lighten(segmentDelta / 100)
          .hex()};\n`;
      });

      s += "\n";
    });

    return s;
  })();

  return (
    <PageLayout>
      <h1>Color Theme Generator</h1>
      {state.colors.map((color, colorIndex) => (
        <ColorRow key={colorIndex}>
          <ColorDotLayout>
            <ColorCell
              color={color.color}
              isEditing={editingIndex === colorIndex}
              onClick={() => setEditingIndex(colorIndex)}
            />
          </ColorDotLayout>
          <ColorDotLayout>
            {colorSegments[colorIndex].map((segmentDelta, segmentIndex) => {
              return (
                <ColorDotSecondary
                  key={segmentIndex}
                  color={
                    segmentDelta > 0
                      ? Color(color.color)
                          .mix(Color("white"), segmentDelta / 100)
                          .hex()
                      : Color(color.color)
                          .mix(Color("black"), -segmentDelta / 100)
                          .hex()
                  }
                  isIndex={segmentDelta === 0}
                />
              );
            })}
          </ColorDotLayout>
        </ColorRow>
      ))}
      {state.colors[editingIndex] ? (
        <SlideOutPanel key={editingIndex} onClose={() => setEditingIndex(-1)}>
          <h2>Color Picker</h2>
          <ColorPicker
            color={state.colors[editingIndex].color}
            setColor={(newColor) => {
              state.colors[editingIndex].color = newColor;
              setState({ ...state });
            }}
          />
          <div style={{ height: 30 }} />
          <div>
            <div>
              <TextButton
                onClick={() => {
                  state.colors[editingIndex].index--;
                  setState({ ...state });
                }}
              >
                SHIFT LEFT
              </TextButton>
            </div>
            <div>
              <TextButton
                onClick={() => {
                  state.colors[editingIndex].index++;
                  setState({ ...state });
                }}
              >
                SHIFT RIGHT
              </TextButton>
            </div>
            <div>
              <TextButton
                onClick={() => {
                  state.colors[editingIndex].increment--;
                  setState({ ...state });
                }}
              >
                DECREASE INCREMENT
              </TextButton>
            </div>
            <div>
              <TextButton
                onClick={() => {
                  state.colors[editingIndex].increment++;
                  setState({ ...state });
                }}
              >
                INCREASE INCREMENT
              </TextButton>
            </div>
          </div>
        </SlideOutPanel>
      ) : null}
      <div>
        <TextButton
          onClick={() => {
            var textArea = document.createElement("textarea");
            textArea.value = exportText;

            // Avoid scrolling to bottom
            textArea.style.top = "0";
            textArea.style.left = "0";
            textArea.style.position = "fixed";

            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
              var successful = document.execCommand("copy");
              var msg = successful ? "successful" : "unsuccessful";
              console.log("Copying text command was " + msg);
            } catch (err) {
              console.error("Unable to copy", err);
            }

            document.body.removeChild(textArea);
          }}
        >
          COPY
        </TextButton>
      </div>
      <CodeBlock>
        <div ref={exportRef}>{exportText}</div>
      </CodeBlock>
    </PageLayout>
  );
};

export default HomePage;
