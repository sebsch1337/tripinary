import styled from "styled-components";
import Image from "next/image";

export default function LogoutButton({ onClick }) {
  return <StyledButton onClick={onClick}>Logout</StyledButton>;
}

const StyledButton = styled.button`
  all: unset;
  padding: 0.3rem 1.5rem;
  height: 2rem;
  width: 8rem;
  background: rgb(49, 107, 255);
  background: linear-gradient(135deg, rgba(49, 107, 255, 1) 0%, rgba(255, 255, 255, 1) 200%);
  border-radius: 25px;
  color: #fff;
  font-size: 1rem;
  text-align: center;
`;
