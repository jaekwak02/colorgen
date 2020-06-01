import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

export const NotificationContext = React.createContext();

const NotificationManager = ({ children }) => {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNotification(null);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [notification]);

  const contextValue = useRef({
    send: setNotification,
  });

  return (
    <NotificationContext.Provider value={contextValue.current}>
      {ReactDOM.createPortal(
        <ElAnchor>
          <ElNotifications>
            {notification && (
              <ElNotification key={notification}>{notification}</ElNotification>
            )}
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

const ElNotifications = styled.div`
  display: grid;
  justify-content: center;
  align-content: flex-start;
`;

const ElNotification = styled.div`
  padding: 15px 30px;
  background-color: var(--color-neutral-500);
  border: 1px solid var(--color-neutral-600);
  border-radius: 5px;

  color: white;
  text-align: center;
`;

export default NotificationManager;
