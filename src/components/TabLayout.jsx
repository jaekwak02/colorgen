import React, { useState, useRef, useLayoutEffect } from "react";
import styled from "styled-components";

const TabLayout = ({ children }) => {
  const tabContainerRef = useRef();
  const indicatorRef = useRef();
  const [selectedTab, setSelectedTab] = useState(0);

  const components = React.Children.toArray(children);
  const tabs = components.filter((c) => c.type?.displayName === "Tab");
  const panels = components.filter((c) => c.type?.displayName === "TabPanel");

  useLayoutEffect(() => {
    const tab = tabContainerRef.current.children[selectedTab];

    if (tab) {
      const containerRect = tabContainerRef.current.getBoundingClientRect();
      const tabRect = tab.getBoundingClientRect();

      indicatorRef.current.style.left =
        tabRect.left - containerRect.left + "px";
      indicatorRef.current.style.width = tabRect.width + "px";
    }
  }, [selectedTab]);

  return (
    <ElContainer>
      <ElTabs ref={tabContainerRef}>
        {tabs.map((component, index) => (
          <ElTab
            key={index}
            {...component.props}
            selected={index === selectedTab}
            onClick={() => setSelectedTab(index)}
          />
        ))}
        <ElIndicator ref={indicatorRef} style={{ width: tabs[selectedTab] }} />
      </ElTabs>
      <div>{panels[selectedTab]}</div>
    </ElContainer>
  );
};

const ElContainer = styled.div`
  display: grid;
  gap: 30px;
`;

const ElTabs = styled.div`
  position: relative;
  height: 30px;
  border-bottom: 2px solid var(--color-neutral-500);

  display: grid;
  grid-auto-flow: column;
  grid-gap: 30px;
  justify-content: start;
  align-items: center;
`;

const ElTab = styled.div`
  position: relative;
  height: 30px;

  display: grid;
  align-items: center;

  color: ${(props) => (props.selected ? "white" : "var(--color-neutral-700)")};

  cursor: pointer;

  transition: 0.25s;

  &:hover {
    color: white;
  }
`;

const ElIndicator = styled.div`
  position: absolute;
  bottom: -2px;
  height: 2px;
  background-color: var(--color-primary-600);
  box-shadow: 0px 0px 2px var(--color-primary-600);

  transition: 0.5s;
`;

export default TabLayout;
