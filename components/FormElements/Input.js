import styled from "styled-components";

export default function Input(props) {
  return (
    <StyledInput
      {...props}
      autoComplete={props.autoComplete || "off"}
      spellCheck={props.spellCheck || "false"}
    />
  );
}

const StyledInput = styled.input`
  margin: ${({ margin }) => margin || "0"};
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "2.5rem"};
  filter: drop-shadow(0 0 0.2rem var(--drop-shadow));
  transition: all ease-in-out 200ms;
  border: 0;
  border-radius: 2rem;
  padding: ${({ padding }) => padding || "0 0.8rem 0 1.1rem"};
  font-size: ${({ fontSize }) => fontSize || "1.1rem"};
  outline: none;

  &:focus {
    filter: drop-shadow(0 0 0.4rem var(--drop-shadow));
  }

  &::-webkit-calendar-picker-indicator {
    width: 1.4rem;
    height: 1.4rem;
  }
`;
