import styled from "styled-components";

export default function Input(props) {
  return <StyledInput {...props} />;
}

const StyledInput = styled.input`
  margin: 0.5rem 0 2rem;
  width: 100%;
  height: 2.5rem;
  filter: drop-shadow(0 0 0.2rem var(--drop-shadow));
  transition: all ease-in-out 200ms;
  border: 0;
  border-radius: 2rem;
  padding-left: 1.1rem;
  padding-right: 0.8rem;
  font-size: 1.2rem;
  outline: none;

  &:focus {
    filter: drop-shadow(0 0 0.4rem var(--drop-shadow));
  }

  &::-webkit-calendar-picker-indicator {
    right: 0;
  }
`;
