import React, { useReducer } from "react";
import clone from "clone";
import ColorRow from "../components/ColorRow";
import ColorCell from "../components/ColorCell";
import ColorCellLayout from "../components/ColorCellLayout";
import ColorCellSmall from "../components/ColorCellSmall";
import SlideOutPanel from "../components/SlideOutPanel";
import ColorPicker from "../components/ColorPicker";
import PageLayout from "../components/PageLayout";
import CodeBlock from "../components/CodeBlock";
import TextInput from "../components/TextInput";
import NumberInput from "../components/NumberInput";
import Button from "../components/Button";
import ThemeLayout from "../components/ThemeLayout";
import ThemeOption from "../components/ThemeOption";
import TabLayout from "../components/TabLayout";
import Tab from "../components/Tab";
import TabPanel from "../components/TabPanel";
import VerticalLayout from "../components/VerticalLayout";
import HorizontalLayout from "../components/HorizontalLayout";
import SidebarLayout from "../components/SidebarLayout";
import Divider from "../components/Divider";
import Badge from "../components/Badge";
import { calculateColor, getSavedThemes, saveTheme } from "../utils";

const DEFAULT_STATE = {
  editingIndex: 0,
  isEditing: false,
  saved: true,
  saveKey: null,
  savedThemes: getSavedThemes(),
  theme: {
    name: "",
    segmentLength: 9,
    colors: [
      {
        color: "#0073B8",
        name: "primary",
        increment: 18,
        index: 3,
      },
      {
        color: "#8B11A8",
        name: "secondary",
        increment: 18,
        index: 3,
      },
      {
        color: "#888888",
        name: "neutral",
        increment: 18,
        index: 3,
      },
    ],
  },
};

const HomePage = () => {
  const [state, dispatchRaw] = useReducer((oldState, action) => {
    const [type, data] = action;

    const state = clone(oldState);

    switch (type) {
      case "START_EDIT": {
        const [value] = data;
        state.isEditing = true;
        state.editingIndex = value;
        break;
      }
      case "STOP_EDIT": {
        state.isEditing = false;
        break;
      }
      case "SAVED": {
        const [saveKey] = data;
        state.saveKey = saveKey;
        state.saved = true;
        state.savedThemes = getSavedThemes();

        break;
      }
      case "LOAD": {
        const [key, theme] = data;

        state.saveKey = key;
        state.theme = clone(theme);
        state.saved = true;
        break;
      }
      case "ADD_COLOR": {
        state.theme.colors.push({
          color: "#888888",
          name: "color",
          increment: 18,
          index: 3,
        });
        state.isEditing = true;
        state.editingIndex = state.theme.colors.length - 1;
        break;
      }
      case "SET_NAME": {
        const [name] = data;
        state.theme.name = name;
        state.saved = false;
        break;
      }
      case "SET_COLOR": {
        const [index, color] = data;
        state.theme.colors[index].color = color;
        state.saved = false;
        break;
      }
      case "SET_COLOR_NAME": {
        const [index, name] = data;
        state.theme.colors[index].name = name;
        state.saved = false;
        break;
      }
      case "SET_COLOR_INCREMENT": {
        const [index, increment] = data;
        state.theme.colors[index].increment = increment;
        state.saved = false;
        break;
      }
      case "SET_COLOR_INDEX": {
        const [index, indexValue] = data;
        state.theme.colors[index].index = indexValue;
        state.saved = false;
        break;
      }
      default: {
        throw new Error(`${type} is not a valid action type.`);
      }
    }

    return state;
  }, DEFAULT_STATE);
  const dispatch = (...args) => dispatchRaw(args);

  console.log({ state });

  const colorSegments = state.theme.colors.map((color) => {
    return [...new Array(9)].map((_, i) => (i - color.index) * color.increment);
  });

  const exportText = (() => {
    let s = "";

    state.theme.colors.forEach((color, colorIndex) => {
      colorSegments[colorIndex].forEach((segmentDelta, segmentIndex) => {
        const hex = calculateColor(color.color, segmentDelta);
        s += `--color-${color.name}-${(segmentIndex + 1) * 100}: ${hex};\n`;
      });

      s += "\n";
    });

    return s;
  })();

  return (
    <PageLayout>
      <h1>Color Theme Generator</h1>
      <TabLayout>
        <Tab>Generator</Tab>
        <TabPanel>
          <SidebarLayout
            rightSidebar={
              <>
                <VerticalLayout>
                  <div>{state.saveKey ? "Current Save" : "Unsaved Theme"}</div>
                  <div>
                    <TextInput
                      value={state.theme.name}
                      onChange={(e) => dispatch("SET_NAME", [e.target.value])}
                      placeholder="Theme Name"
                    />
                  </div>
                  <HorizontalLayout>
                    <Button
                      isDisabled={!state.saveKey}
                      onClick={() => {
                        const key = saveTheme(state.theme, state.saveKey);
                        dispatch("SAVED", [key]);
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => {
                        const key = saveTheme(state.theme, null);
                        dispatch("SAVED", [key]);
                      }}
                    >
                      Save As New
                    </Button>
                  </HorizontalLayout>
                  <div>
                    {state.saved ? (
                      <Badge success>Saved</Badge>
                    ) : (
                      <Badge error>Unsaved Changes</Badge>
                    )}
                  </div>
                </VerticalLayout>
                <Divider />
                <ThemeLayout>
                  {state.savedThemes.map((save, themeIndex) => (
                    <ThemeOption
                      key={themeIndex}
                      isActive={save.key === state.saveKey}
                      theme={save.theme}
                      onClick={() => dispatch("LOAD", [save.key, save.theme])}
                    />
                  ))}
                </ThemeLayout>
              </>
            }
          >
            {state.theme.colors.map((color, colorIndex) => {
              const isEditing =
                state.isEditing && state.editingIndex === colorIndex;

              return (
                <div key={colorIndex}>
                  <ColorRow>
                    <ColorCellLayout
                      isEditing={isEditing}
                      onClick={() => dispatch("START_EDIT", [colorIndex])}
                    >
                      <ColorCell color={color.color} />
                    </ColorCellLayout>
                    <ColorCellLayout>
                      {colorSegments[colorIndex].map(
                        (segmentDelta, segmentIndex) => (
                          <ColorCell
                            key={segmentIndex}
                            color={calculateColor(color.color, segmentDelta)}
                            isIndex={segmentDelta === 0}
                            isEditing={isEditing}
                            delta={segmentDelta}
                          />
                        )
                      )}
                    </ColorCellLayout>
                  </ColorRow>
                </div>
              );
            })}
            <div>
              <Button onClick={() => dispatch("ADD_COLOR")}>Add Color</Button>
            </div>
            <h3>Export</h3>
            <div>
              <VerticalLayout>
                {state.theme.colors.map((color, colorIndex) => (
                  <HorizontalLayout key={colorIndex}>
                    <ColorCellSmall style={{ backgroundColor: color.color }} />
                    <TextInput
                      value={color.name}
                      onChange={(e) =>
                        dispatch("SET_COLOR_NAME", [colorIndex, e.target.value])
                      }
                    />
                  </HorizontalLayout>
                ))}
              </VerticalLayout>
            </div>
            <CodeBlock text={exportText} />
          </SidebarLayout>

          <SlideOutPanel
            isOpen={state.isEditing}
            onClose={() => dispatch("STOP_EDIT")}
          >
            {state.theme.colors[state.editingIndex] && (
              <React.Fragment key={state.editingIndex}>
                <VerticalLayout>
                  <h2>Color Picker</h2>
                  <ColorPicker
                    color={state.theme.colors[state.editingIndex].color}
                    setColor={(newColor) =>
                      dispatch("SET_COLOR", [state.editingIndex, newColor])
                    }
                  />
                  <NumberInput
                    label="Value Increment"
                    value={state.theme.colors[state.editingIndex].increment}
                    onChange={(value) =>
                      dispatch("SET_COLOR_INCREMENT", [
                        state.editingIndex,
                        value,
                      ])
                    }
                    increment={0.5}
                    formatter={(n) => `${n}%`}
                  />
                  <NumberInput
                    label="Center Position"
                    value={state.theme.colors[state.editingIndex].index}
                    onChange={(value) =>
                      dispatch("SET_COLOR_INDEX", [state.editingIndex, value])
                    }
                    formatter={(n) => n + 1}
                  />
                </VerticalLayout>
              </React.Fragment>
            )}
          </SlideOutPanel>
        </TabPanel>

        <Tab>Methodology</Tab>
        <TabPanel>
          <h3>Methodology - Work In Progress</h3>
          <p>
            Information about the methodology for generating colors will
            eventually be published here.
          </p>
        </TabPanel>

        <Tab>About</Tab>
        <TabPanel>
          <h3>About - Work In Progress</h3>
          <p>
            Information about the tool, code, and author will eventually be
            published here.
          </p>
        </TabPanel>
      </TabLayout>
    </PageLayout>
  );
};

export default HomePage;
