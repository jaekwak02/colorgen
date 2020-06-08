import styled from "styled-components"

const TextButton = styled.div`
  display: inline-block;

  color: white;

  cursor: pointer;

  user-select: none;

  &:hover {
    color: var(--color-primary-800);
  }
`

export default TextButton;