import React from "react";
import styled from "styled-components";

const Tab = ({ children }) => {
  return <ElContainer>{children}</ElContainer>;
};

Tab.displayName = "Tab";

const ElContainer = styled.div`
  position: relative;
  height: 30px;

  display: grid;
  align-items: center;
`;

export default Tab;
