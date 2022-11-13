import styled from "styled-components";

export default function CrossIcon(props) {
  return <Cross {...props}>+</Cross>;
}

const Cross = styled.span`
  transform: rotate(45deg);
  color: ${({ color }) => color || "var(--drop-shadow)"};
  font-size: ${({ iconSize }) => iconSize || "1rem"};
  line-height: 100%;
  align-self: flex-end;
`;
