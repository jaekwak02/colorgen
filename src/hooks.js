import { useState, useCallback } from "react";
import { useMediaQuery } from "react-responsive";
import { NotificationContext } from "./project/NotificationManager";
import { useContext } from "react";

const MEDIA_QUERY_SIZES = {
  small: 500,
  medium: 750,
  large: 1150,
};

export const useForceUpdate = () => {
  const [, setIncrement] = useState(0);

  const callback = useCallback(() => setIncrement((x) => x + 1), []);

  return callback;
};

export const useResponsive = (size) => {
  const forceUpdate = useForceUpdate();

  const query = MEDIA_QUERY_SIZES[size];

  if (!query) {
    throw new Error(`size "${size}" is not a valid size`);
  }

  return useMediaQuery({ query }, undefined, () => console.log("TEST"));
};

export const useNotificationContext = () => useContext(NotificationContext);
