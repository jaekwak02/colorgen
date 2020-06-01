import React from "react";
import styled from "styled-components";

const Divider = (props) => <ElContainer {...props} />;

const ElContainer = styled.div`
  border-bottom: 1px solid var(--color-neutral-600);
`;

export default Divider;
