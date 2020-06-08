import React, { useState } from "react";
import styled from "styled-components";
import Responsive from "../components/Responsive";
import SlideOutPanel from "../components/SlideOutPanel";
import Button from "../components/Button";

const SidebarLayout = ({ leftSidebar, rightSidebar, children }) => {
  const columns =
    (leftSidebar ? "auto " : "") +
    "minmax(0, 1fr)" +
    (rightSidebar ? " auto" : "");

  const [isOpen, setIsOpen] = useState(false);

  return (
    <ElContainer style={{ gridTemplateColumns: columns }}>
      <Responsive minWidth={1200}>
        {leftSidebar && <ElSidebar>{leftSidebar}</ElSidebar>}
      </Responsive>
      <ElContent>{children}</ElContent>
      <Responsive minWidth={1200}>
        {rightSidebar && <ElSidebar>{rightSidebar}</ElSidebar>}
      </Responsive>
      <Responsive maxWidth={1199}>
        <ElExpander>
          <Button onClick={() => setIsOpen(true)}>Saves</Button>
        </ElExpander>
        <SlideOutPanel
          isOpen={isOpen}
          width={360}
          darken
          onClose={() => setIsOpen(false)}
        >
          {leftSidebar}
          {rightSidebar}
        </SlideOutPanel>
      </Responsive>
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
`;

const ElExpander = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
`;

export default SidebarLayout;
