import React from "react";
import styled from "styled-components";

const PageLayout = ({ children }) => {
  return (
    <ElContainer>
      <ElPage>{children}</ElPage>
    </ElContainer>
  );
};

const ElContainer = styled.div`
  display: grid;
  justify-items: center;
`;

const ElPage = styled.div`
  position: relative;

  padding: 30px;
  width: 100%;
  max-width: 1600px;

  display: grid;
  gap: 30px;
`;

export default PageLayout;
