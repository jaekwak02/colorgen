import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components";
import Button from "../components/Button";

const Modal = ({
  children,
  title,
  width = 400,
  cancelText = "Cancel",
  cancelCallback,
  primaryText,
  primaryCallback,
  errorText,
  errorCallback,
}) => {
  const callbackRef = useRef();
  callbackRef.current = cancelCallback;

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        callbackRef.current();
      }
    };

    document.addEventListener("keydown", listener);

    return () => document.removeEventListener("keydown", listener);
  }, []);

  return ReactDOM.createPortal(
    <>
      <ElBackground onClick={() => cancelCallback()} />
      <ElContainer>
        <ElModal style={{ width }}>
          <h3>{title}</h3>
          <div>{children}</div>
          <ElModalActions>
            <Button onClick={cancelCallback}>{cancelText}</Button>
            {primaryText && (
              <Button type="primary" onClick={primaryCallback} autoFocus>
                {primaryText}
              </Button>
            )}
            {errorText && (
              <Button type="error" onClick={errorCallback} autoFocus>
                {errorText}
              </Button>
            )}
          </ElModalActions>
        </ElModal>
      </ElContainer>
    </>,
    document.body
  );
};

const FadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ElBackground = styled.div`
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;

  background-color: rgba(0, 0, 0, 0.5);

  animation: ${FadeInAnimation} 0.25s ease-in 1;
`;

const FadeDropInAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10%);
  }
  to {
    opacity: 1;
    transform: translateY(0%);
  }
`;

const ElContainer = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;

  padding: 10vh 10vw;

  display: grid;
  align-items: start;
  justify-items: center;

  pointer-events: none;
`;

const ElModal = styled.div`
  background-color: var(--color-neutral-400);
  border: 1px solid var(--color-neutral-500);
  padding: 15px;

  display: grid;
  gap: 15px;
  grid-template-rows: auto 1fr auto;

  pointer-events: all;

  animation: ${FadeDropInAnimation} 0.25s ease-in 1;
`;

const ElModalActions = styled.div`
  display: grid;
  gap: 15px;
  justify-content: end;
  align-items: center;
  grid-auto-flow: column;
`;

export default Modal;
