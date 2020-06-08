import React from "react";
import styled from "styled-components";
import Button from "../components/Button";
import { useNotificationContext } from "../hooks";

const CodeBlock = ({ text }) => {
  const notification = useNotificationContext();

  return (
    <ElContainer>
      {text}
      <ElActions>
        <Button
          onClick={() => {
            var textArea = document.createElement("textarea");
            textArea.value = text;

            // Avoid scrolling to bottom
            textArea.style.top = "0";
            textArea.style.left = "0";
            textArea.style.position = "fixed";

            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
              var successful = document.execCommand("copy");

              if (successful) {
                notification.send("Copied to Clipboard!");
              } else {
                notification.send("Failed to Copy to Clipboard");
              }
            } catch (err) {
              console.error("Unable to copy", err);

              notification.send("Failed to Copy to Clipboard");
            }

            document.body.removeChild(textArea);
          }}
        >
          Copy to Clipboard
        </Button>
      </ElActions>
    </ElContainer>
  );
};

const ElContainer = styled.div`
  position: relative;
  background-color: var(--color-neutral-300);
  border: 1px solid var(--color-neutral-500);
  padding: 30px;

  font-family: "Roboto Mono", monospace;
  white-space: pre-line;
`;

const ElActions = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;

  display: grid;
  gap: 30px;
  justify-items: end;
`;

export default CodeBlock;
