import styled from "styled-components";

export default function Main({ children }) {
  return <StyledMain>{children}</StyledMain>;
}

const StyledMain = styled.main`
  position: absolute;
  top: 40vh;
  border-top-left-radius: 3rem;
  border-top-right-radius: 3rem;
  background-color: var(--background-primary);
  width: 100vw;
`;
