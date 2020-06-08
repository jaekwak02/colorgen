import React from "react";
import styled from "styled-components";

const TabPanel = (props) => <ElContainer {...props} />;

TabPanel.displayName = "TabPanel";

const ElContainer = styled.div`
  position: relative;

  display: grid;
  gap: 30px;
`;

export default TabPanel;
