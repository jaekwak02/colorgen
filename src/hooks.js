import { useState, useCallback } from "react";
import { useMediaQuery } from "react-responsive";
import { NotificationContext } from "./project/NotificationManager";
import { useContext } from "react";

export const useForceUpdate = () => {
  const [, setIncrement] = useState(0);

  const callback = useCallback(() => setIncrement((x) => x + 1), []);

  return callback;
};

export const useResponsive = ({ minWidth, maxWidth }) => {
  const query = {};
  if (minWidth) query.minWidth = minWidth;
  if (maxWidth) query.maxWidth = maxWidth;

  return useMediaQuery(query);
};

export const useNotificationContext = () => useContext(NotificationContext);
