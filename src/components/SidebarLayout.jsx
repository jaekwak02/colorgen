import React from "react";
import styled from "styled-components";

const SidebarLayout = ({ leftSidebar, rightSidebar, children }) => {
  const columns =
    (leftSidebar ? "auto " : "") +
    "minmax(0, 1fr)" +
    (rightSidebar ? " auto" : "");

  return (
    <ElContainer style={{ gridTemplateColumns: columns }}>
      {leftSidebar && <ElSidebar>{leftSidebar}</ElSidebar>}
      <ElContent>{children}</ElContent>
      {rightSidebar && <ElSidebar>{rightSidebar}</ElSidebar>}
    </ElContainer>
  );
};

const ElContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 60px;
`;

const ElContent = styled.div`
  display: grid;
  align-content: start;
  gap: 30px;
`;

const ElSidebar = styled.div`
  width: 240px;

  display: grid;
  align-content: start;
  gap: 30px;
`;

export default SidebarLayout;
