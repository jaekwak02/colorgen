import React from "react";
import styled from "styled-components";

const VerticalLayout = (props) => <ElContainer {...props} />;

const ElContainer = styled.div`
  display: grid;
  grid-gap: 15px;
  align-content: flex-start;
`;

export default VerticalLayout;
