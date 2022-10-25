import styled from "styled-components";
import Image from "next/image";
import saveSvg from "../assets/save.svg";

export default function EditDatesForm() {
  return (
    <EditDates aria-label="Edit dates form">
      <StyledLabel>Start Date</StyledLabel>
      <StyledInput aria-label="start Date" name="startDate" type="date" />
      <StyledLabel>End Date</StyledLabel>
      <StyledInput aria-label="end date" name="endDate" type="date" />
      <StyledButton aria-label="save dates">
        <Image src={saveSvg} width="290px" height="40px" alt="Save icon" />
      </StyledButton>
    </EditDates>
  );
}

const StyledButton = styled.button`
  margin-top: 4em;
  display: flex;
  justify-content: center;
  border: none;
  background-color: transparent;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 2em;
  filter: drop-shadow(0 0 0.3em var(--drop-shadow));
  transition: all ease-in-out 200ms;
  border: 0;
  border-radius: 50px;
  padding-left: 1.1em;
  padding-right: 0.5em;
  font-size: 1.2rem;
  outline: none;

  &:focus {
    filter: drop-shadow(0 0 0.6em var(--drop-shadow));
  }

  &::-webkit-calendar-picker-indicator {
    right: 0;
  }
`;

const StyledLabel = styled.h3`
  margin: 1.5em 0 0.5em 0;
`;

const EditDates = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
