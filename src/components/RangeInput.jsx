import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const VerticalRangeInput = ({
  label,
  value = [0, 80],
  max = 100,
  onChange = () => null,
}) => {
  const [state, setState] = useState({
    valueMin: value[0],
    valueMax: value[1],
  });

  const trackRef = useRef();
  const draggingRef = useRef(0);
  const onChangeRef = useRef();
  const stateRef = useRef();
  onChangeRef.current = onChange;
  stateRef.current = state;

  useEffect(() => {
    const mouseMoveListener = (e) => {
      if (draggingRef.current) {
        const trackRect = trackRef.current.getBoundingClientRect();
        const x = (e.clientX - trackRect.left) / trackRect.width;
        const nextValue = Math.min(max, Math.max(0, Math.round(x * max)));

        if (draggingRef.current === 1) {
          setState((state) => ({ ...state, valueMin: nextValue }));
        } else {
          setState((state) => ({ ...state, valueMax: nextValue }));
        }
      }
    };

    const mouseUpListener = (e) => {
      if (draggingRef.current) {
        onChangeRef.current([
          stateRef.current.valueMin,
          stateRef.current.valueMax,
        ]);
      }

      draggingRef.current = 0;
    };

    document.addEventListener("mousemove", mouseMoveListener);
    document.addEventListener("mouseup", mouseUpListener);

    return () => {
      document.removeEventListener("mousemove", mouseMoveListener);
      document.removeEventListener("mouseup", mouseUpListener);
    };
  }, [max]);

  return (
    <ElContainer>
      <div>{label}</div>
      <ElTrack ref={trackRef}>
        <ElFilled
          style={{
            left: `${(state.valueMin / max) * 100}%`,
            width: `${((state.valueMax - state.valueMin) / max) * 100}%`,
          }}
        />
        <ElValue style={{ left: `${(state.valueMin / max) * 100}%` }}>
          {state.valueMin}
        </ElValue>
        <ElTack
          style={{ left: `${(state.valueMin / max) * 100}%` }}
          onMouseDown={(e) => {
            e.preventDefault();
            draggingRef.current = 1;
          }}
        />
        <ElValue style={{ left: `${(state.valueMax / max) * 100}%` }}>
          {state.valueMax}
        </ElValue>
        <ElTack
          style={{ left: `${(state.valueMax / max) * 100}%` }}
          onMouseDown={(e) => {
            e.preventDefault();
            draggingRef.current = 2;
          }}
        />
      </ElTrack>
    </ElContainer>
  );
};

const ElContainer = styled.div`
  height: 30px;

  display: grid;
  gap: 30px;
  grid-template-columns: 1fr auto;
  align-items: center;
`;

const ElTrack = styled.div`
  position: relative;
  background-color: var(--color-neutral-300);
  height: 8px;
  min-width: 200px;
`;

const ElValue = styled.div`
  position: absolute;
  top: -20px;
  transform: translateX(-50%);

  font-size: 0.8rem;

  pointer-events: none;

  user-select: none;
`;

const ElTack = styled.div`
  position: absolute;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  background-color: var(--color-neutral-700);
  width: 4px;
  height: 16px;

  cursor: pointer;
`;

const ElFilled = styled.div`
  position: relative;
  height: 8px;
  background-color: var(--color-neutral-500);
`;

export default VerticalRangeInput;
