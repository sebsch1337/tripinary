import styled from "styled-components";

export default function DeleteAccountButton({ onClick }) {
  return <StyledButton onClick={onClick}>Delete account</StyledButton>;
}

const StyledButton = styled.button`
  all: unset;
  padding: 0.3rem 1.5rem;
  height: 2rem;
  width: 8rem;
  background: linear-gradient(135deg, rgba(255, 49, 49, 1) 0%, rgba(255, 255, 255, 1) 200%);
  border-radius: 25px;
  color: #fff;
  font-size: 1rem;
  text-align: center;
`;
