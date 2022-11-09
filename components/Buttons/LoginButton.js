import styled from "styled-components";
import Image from "next/image";

export default function LoginButton({ onClick, providerName, bgColor, icon }) {
  return (
    <StyledButton onClick={onClick} bgColor={bgColor}>
      <Image src={icon} alt={`${providerName} icon`} width="35px" height="35px" />
      Login with {providerName}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  all: unset;
  padding: 0.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 90%;
  height: 3rem;
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 0.5rem;
  color: #fff;
  font-size: 1.5rem;
`;
