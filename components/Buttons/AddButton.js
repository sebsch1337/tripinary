import styled from "styled-components";

export default function AddButton(props) {
  return <StyledButton {...props}>+</StyledButton>;
}

const StyledButton = styled.button`
  all: unset;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 100%;
  color: #fff;
  font-size: ${({ iconSize }) => iconSize || "1.5rem"};
  width: ${({ width }) => width || "2.5rem"};
  height: ${({ height }) => height || "2.5rem"};
  border-radius: 100%;
  background: var(--gradient-primary);
`;
