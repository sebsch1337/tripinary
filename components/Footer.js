import styled from "styled-components";

export default function Footer({ children }) {
  return <FooterBar>{children}</FooterBar>;
}

const FooterBar = styled.footer`
  width: 100vw;
  height: 4em;
  padding: 0 2em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  background-color: #fff;
  filter: drop-shadow(0 0 0.3em var(--drop-shadow));
`;
