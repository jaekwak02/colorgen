import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { clamp } from "../utils/utils";

const MarkerContainer = ({
  position,
  setPosition,
  width = 100,
  height = 100,
  style,
  ...rest
}) => {
  const colorPickerRef = useRef();
  const mouseDownRef = useRef(false);

  useEffect(() => {
    const mouseUpListener = () => (mouseDownRef.current = false);
    const mouseMoveListener = (e) => {
      if (mouseDownRef.current) {
        setPosition([
          clamp(
            e.clientX - colorPickerRef.current.getBoundingClientRect().left,
            0,
            width
          ),
          clamp(
            e.clientY - colorPickerRef.current.getBoundingClientRect().top,
            0,
            height
          ),
        ]);
      }
    };

    document.addEventListener("mouseup", mouseUpListener);
    document.addEventListener("mousemove", mouseMoveListener);

    return () => {
      document.removeEventListener("mouseup", mouseUpListener);
      document.removeEventListener("mousemove", mouseMoveListener);
    };
  }, [width, height, setPosition]);

  const handleColorSelect = (e) => {
    if (mouseDownRef.current) {
      setPosition([
        e.clientX - e.target.getBoundingClientRect().left,
        e.clientY - e.target.getBoundingClientRect().top,
      ]);
    }
  };

  return (
    <ElContainer
      {...rest}
      ref={colorPickerRef}
      onMouseDown={(e) => {
        mouseDownRef.current = true;
        handleColorSelect(e);
      }}
      style={{
        ...style,
        width,
        height,
      }}
    />
  );
};

const ElContainer = styled.div`
  position: relative;
`;

export default MarkerContainer;
