import React from "react";
import styled from "styled-components"

const PageLayout = ({ children }) => {
  return <StyledContainer>
    {children}
  </StyledContainer>
}

const StyledContainer = styled.div`
  padding: 30px;

  display: grid;
  gap: 30px;
`

export default PageLayout;