import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const SlideOutPanel = ({
  isOpen,
  onClose,
  width = 800,
  darken = false,
  children,
}) => {
  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", listener);

    return () => document.removeEventListener("keydown", listener);
  }, []); // eslint-disable-line

  return ReactDOM.createPortal(
    <>
      {isOpen && (
        <StyledBackground
          onClick={() => onClose()}
          style={{
            backgroundColor: darken ? "rgba(0, 0, 0, 0.5)" : "transparent",
          }}
        />
      )}

      <StyledContainer
        style={{
          transform: isOpen ? "translateX(0%)" : "translateX(100%)",
          width,
        }}
      >
        <StyledContent>{children}</StyledContent>
        <StyledCloseAction onClick={() => onClose()}>Close</StyledCloseAction>
      </StyledContainer>
    </>,
    document.body
  );
};

const StyledBackground = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
`;

const StyledContainer = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  background-color: var(--color-neutral-400);
  border-left: 1px solid var(--color-neutral-500);
  box-shadow: var(--box-shadow-3);

  display: grid;
  grid-template-rows: 1fr auto;
  gap: 30px;

  transition: 0.5s;
`;

const StyledContent = styled.div`
  padding: 30px;
  overflow-y: auto;
`;

const StyledCloseAction = styled.div`
  padding: 45px;
  background-color: var(--color-neutral-300);

  font-size: 20px;
  text-align: center;

  transition: 0.5s;
  cursor: pointer;

  &:hover {
    background-color: var(--color-neutral-500);
  }
`;

export default SlideOutPanel;
