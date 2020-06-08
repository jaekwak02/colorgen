import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import styled, { css } from "styled-components";
import { generateRandomString } from "../utils";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export const NotificationContext = React.createContext();

const TIMEOUT = 5000;

const NotificationManager = ({ children }) => {
  const [notifications, setNotification] = useState([]);

  const sendNotification = (content, type) => {
    const key = generateRandomString();

    setNotification((notifications) => [
      ...notifications,
      {
        key,
        type,
        content,
      },
    ]);

    setTimeout(
      () =>
        setNotification((notifications) => {
          const index = notifications.findIndex((x) => x.key === key);
          const newNotifications = [...notifications];
          newNotifications.splice(index, 1);
          return newNotifications;
        }),
      TIMEOUT
    );
  };

  const contextValue = useRef({
    send: (content) => sendNotification(content, "success"),
  });

  return (
    <NotificationContext.Provider value={contextValue.current}>
      {ReactDOM.createPortal(
        <ElAnchor>
          <ElNotifications>
            {notifications.map((notification) => (
              <CSSTransition
                key={notification.key}
                in
                appear
                classNames="csst-notification"
                mountOnEnter
                timeout={TIMEOUT}
              >
                <ElNotification type={notification.type}>
                  {notification.content}
                </ElNotification>
              </CSSTransition>
            ))}
          </ElNotifications>
        </ElAnchor>,
        document.body
      )}
      {children}
    </NotificationContext.Provider>
  );
};

const ElAnchor = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  padding: 30px;

  pointer-events: none;
`;

const ElNotifications = styled(TransitionGroup)`
  display: grid;
  gap: 15px;
  justify-content: center;
  align-content: flex-start;
`;

const styles = {
  primary: css``,
  success: css`
    background-color: var(--color-success-800);
    border: 1px solid var(--color-success-400);
    color: var(--color-success-100);
  `,
  error: css`
    background-color: var(--color-error-100);
    border: 1px solid var(--color-error-500);
    color: var(--color-error-500);
  `,
};

const ElNotification = styled.div`
  padding: 10px 30px;
  background-color: var(--color-neutral-500);
  border: 1px solid var(--color-neutral-600);
  border-radius: 5px;

  color: white;
  text-align: center;

  ${(props) => styles[props.type]}
`;

export default NotificationManager;
