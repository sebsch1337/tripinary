import styled from "styled-components";
import Image from "next/image";

export default function LogoutButton({ onClick }) {
  return <StyledButton onClick={onClick}>Logout</StyledButton>;
}

const StyledButton = styled.button`
  all: unset;
  margin: 1rem;
  padding: 0.2rem;
  width: 20%;
  height: 2rem;
  background-color: #24292e;
  border-radius: 0.5rem;
  color: #fff;
  font-size: 1rem;
  text-align: center;
`;
