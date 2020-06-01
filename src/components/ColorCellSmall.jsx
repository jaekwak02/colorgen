import React from "react";
import styled from "styled-components";

const ColorCellSmall = (props) => <ElContainer {...props} />;

const ElContainer = styled.div`
  height: 30px;
  width: 30px;
  border: 1px solid var(--color-neutral-600);
`;

export default ColorCellSmall;
