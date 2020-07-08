import React from "react";
import HorizontalLayout from "../components/HorizontalLayout";
import Badge from "../components/Badge";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { saveTheme } from "../utils";
import { useNotificationContext } from "../hooks";

const CurrentSave = ({ state, dispatch }) => {
  const notification = useNotificationContext();

  return (
    <div
      style={{
        border: "1px solid var(--color-neutral-500)",
        padding: 15,
      }}
    >
      <HorizontalLayout>
        {state.saved ? (
          <Badge success>Saved</Badge>
        ) : (
          <Badge error>Unsaved</Badge>
        )}
        <div>{state.saveKey ? "Current Save" : "New Save"}:</div>
        <TextInput
          value={state.theme.name}
          onChange={(e) => dispatch("SET_NAME", [e.target.value])}
          placeholder="Theme Name"
        />
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
    </div>
  );
};

export default CurrentSave;
