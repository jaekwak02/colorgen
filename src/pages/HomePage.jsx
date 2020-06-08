import React, { useReducer, useEffect, useState } from "react";
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
import NumberIncrementInput from "../components/NumberIncrementInput";
import ColorDisplay from "../components/ColorDisplay";
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
import ThemeGenerator from "../components/ThemeGenerator";
import Modal from "../components/Modal";
import {
  calculateColor,
  getSavedThemes,
  saveTheme,
  deleteTheme,
  generateTheme,
} from "../utils";
import { useNotificationContext } from "../hooks";

const DEFAULT_SCHEME = "analogous";

const DEFAULT_COLORS = generateTheme(DEFAULT_SCHEME, true);

const DEFAULT_STATE = {
  editingIndex: 0,
  deletingKey: 0,
  deletingColorIndex: 0,
  isEditing: false,
  isDeleting: false,
  isDeletingColor: false,
  saved: false,
  saveKey: null,
  savedThemes: getSavedThemes(),
  theme: {
    generator: {
      locked: false,
      scheme: DEFAULT_SCHEME,
      base: "",
    },
    name: "",
    segmentLength: 9,
    colors: DEFAULT_COLORS,
  },
};

const HomePage = () => {
  const notification = useNotificationContext();
  const [quickEditedIndex, setQuickEditedIndex] = useState(null);
  const [quickEditedCount, setQuickEditedCount] = useState(0);

  useEffect(() => {
    if (quickEditedIndex !== null) {
      const timeout = setTimeout(() => setQuickEditedIndex(null), 5000);

      return () => clearTimeout(timeout);
    }
  }, [quickEditedIndex, quickEditedCount]);

  const [state, dispatchRaw] = useReducer((oldState, action) => {
    const [type, data] = action;

    const state = clone(oldState);

    switch (type) {
      case "START_EDIT": {
        const [index] = data;
        state.isEditing = true;
        state.editingIndex = index;
        break;
      }
      case "STOP_EDIT": {
        state.isEditing = false;
        break;
      }
      case "START_DELETE": {
        const [key] = data;
        state.isDeleting = true;
        state.deletingKey = key;
        break;
      }
      case "STOP_DELETE": {
        state.isDeleting = false;
        state.savedThemes = getSavedThemes();
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
      case "SET_GENERATOR": {
        const [generator] = data;
        state.theme.generator = generator;
        state.saved = false;
        break;
      }
      case "GENERATED": {
        const [colors] = data;
        state.theme.colors = colors;
        state.saved = false;
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
        state.saved = false;
        break;
      }
      case "REORDER_COLOR": {
        const [index, direction] = data;
        const target = state.theme.colors.splice(index, 1)[0];
        if (direction < 0) {
          state.theme.colors.splice(index + 1, 0, target);
        } else {
          state.theme.colors.splice(index - 1, 0, target);
        }
        state.saved = false;
        break;
      }
      case "START_DELETE_COLOR": {
        const [index] = data;
        state.isDeletingColor = true;
        state.deletingColorIndex = index;
        break;
      }
      case "STOP_DELETE_COLOR": {
        const [confirm] = data;
        state.isDeletingColor = false;
        if (confirm) {
          state.theme.colors.splice(state.deletingColorIndex, 1);
        }
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

  const colorSegments = state.theme.colors.map((color) => {
    return [...new Array(9)].map((_, i) => (i - color.index) * color.increment);
  });

  const exportText = (() => {
    let s = "";

    state.theme.colors.forEach((color, colorIndex) => {
      colorSegments[colorIndex].forEach((segmentDelta, segmentIndex) => {
        const hex = calculateColor(color.color, segmentDelta);
        s += `--${color.name}-${(segmentIndex + 1) * 100}: ${hex};\n`;
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
              <VerticalLayout style={{ gap: 30 }}>
                <VerticalLayout style={{ position: "relative" }}>
                  <HorizontalLayout>
                    <div>{state.saveKey ? "Current Save" : "New Save"}</div>
                    {state.saved ? (
                      <Badge success>Saved</Badge>
                    ) : (
                      <Badge error>Unsaved</Badge>
                    )}
                  </HorizontalLayout>
                  <TextInput
                    value={state.theme.name}
                    onChange={(e) => dispatch("SET_NAME", [e.target.value])}
                    placeholder="Theme Name"
                  />
                  <HorizontalLayout>
                    <Button
                      isDisabled={!state.saveKey}
                      onClick={() => {
                        const key = saveTheme(state.theme, state.saveKey);
                        notification.send("Saved!");
                        dispatch("SAVED", [key]);
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => {
                        const key = saveTheme(state.theme, null);
                        notification.send("Saved as a New Theme!");
                        dispatch("SAVED", [key]);
                      }}
                    >
                      Save As New
                    </Button>
                  </HorizontalLayout>
                </VerticalLayout>
                <Divider />
                {state.saveKey && (
                  <ThemeOption
                    isActive
                    theme={
                      state.savedThemes.find(
                        (save) => save.key === state.saveKey
                      ).theme
                    }
                  />
                )}
                {state.saveKey && <Divider />}
                <ThemeLayout>
                  {state.savedThemes.map((save, themeIndex) =>
                    save.key === state.saveKey ? null : (
                      <ThemeOption
                        key={themeIndex}
                        isActive={save.key === state.saveKey}
                        theme={save.theme}
                        onClick={() => dispatch("LOAD", [save.key, save.theme])}
                        onDelete={() => dispatch("START_DELETE", [save.key])}
                      />
                    )
                  )}
                </ThemeLayout>
              </VerticalLayout>
            }
          >
            <h3>1. Generate</h3>
            <ThemeGenerator
              theme={state.theme}
              onGeneratorChange={(generator) =>
                dispatch("SET_GENERATOR", [generator])
              }
              onGenerate={(colors) => dispatch("GENERATED", [colors])}
            />
            <h3>2. Adjust</h3>
            <ColorDisplay
              theme={state.theme}
              onColorClick={(colorIndex) =>
                dispatch("START_EDIT", [colorIndex])
              }
            />
            {state.theme.colors.map((color, colorIndex) => {
              const isEditing =
                state.isEditing && state.editingIndex === colorIndex;
              const quickEditing = quickEditedIndex === colorIndex;

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
                            isEditing={isEditing || quickEditing}
                            delta={segmentDelta}
                          />
                        )
                      )}
                    </ColorCellLayout>
                    <HorizontalLayout style={{ alignItems: "stretch" }}>
                      <NumberIncrementInput
                        value={color.increment}
                        increment={0.5}
                        onChange={(n) => {
                          setQuickEditedIndex(colorIndex);
                          setQuickEditedCount((x) => x + 1);
                          dispatch("SET_COLOR_INCREMENT", [colorIndex, n]);
                        }}
                        formatter={(n) => `${n}%`}
                      />
                      <NumberIncrementInput
                        value={color.index}
                        onChange={(n) => {
                          setQuickEditedIndex(colorIndex);
                          setQuickEditedCount((x) => x + 1);
                          dispatch("SET_COLOR_INDEX", [colorIndex, n]);
                        }}
                        formatter={(n) => n + 1}
                      />
                      <NumberIncrementInput
                        value={colorIndex}
                        onChange={(n) =>
                          dispatch("REORDER_COLOR", [
                            colorIndex,
                            n - colorIndex,
                          ])
                        }
                        showValue={false}
                        incrementSymbol="⮝"
                        decrementSymbol="⮟"
                      />
                      <VerticalLayout style={{ alignContent: "center" }}>
                        <Button
                          onClick={() =>
                            dispatch("START_DELETE_COLOR", [colorIndex])
                          }
                          style={{
                            height: 40,
                            width: 40,
                            borderRadius: 20,
                            padding: 0,
                          }}
                        >
                          ✕
                        </Button>
                      </VerticalLayout>
                    </HorizontalLayout>
                  </ColorRow>
                </div>
              );
            })}
            <div>
              <Button onClick={() => dispatch("ADD_COLOR")}>Add Color</Button>
            </div>
            <h3>3. Export</h3>
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
            width={730}
            onClose={() => dispatch("STOP_EDIT")}
          >
            {state.theme.colors[state.editingIndex] && (
              <React.Fragment key={`${state.isEditing}|${state.editingIndex}`}>
                <VerticalLayout>
                  <h2>Color Picker</h2>
                  <ColorPicker
                    color={state.theme.colors[state.editingIndex].color}
                    setColor={(newColor) =>
                      dispatch("SET_COLOR", [state.editingIndex, newColor])
                    }
                  />
                  <Divider />
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

        <Tab>About</Tab>
        <TabPanel>
          <h2>About</h2>
          <div>
            Color Theme Generator is an original project created by Jae Young
            Kwak. It is made using <a href="https://reactjs.org">ReactJS</a>.
          </div>
          <div>
            To see the code, visit the{" "}
            <a href="https://github.com/jaekwak02/colorgen">
              Github Repository
            </a>
            .
          </div>
        </TabPanel>
      </TabLayout>

      {state.isDeleting && (
        <Modal
          title="Confirm Deletion"
          cancelCallback={() => dispatch("STOP_DELETE")}
          errorText="Delete"
          errorCallback={() => {
            deleteTheme(state.deletingKey);
            notification.send("Deleted Theme");
            dispatch("STOP_DELETE");
          }}
        >
          Are you sure you want to delete this theme?
        </Modal>
      )}

      {state.isDeletingColor && (
        <Modal
          title="Confirm Deletion"
          cancelCallback={() => dispatch("STOP_DELETE_COLOR", [false])}
          errorText="Remove"
          errorCallback={() => {
            deleteTheme(state.deletingKey);
            notification.send("Removed Color");
            dispatch("STOP_DELETE_COLOR", [true]);
          }}
        >
          Are you sure you want to remove this color?
        </Modal>
      )}
    </PageLayout>
  );
};

export default HomePage;
