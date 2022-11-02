import styled from "styled-components";
import Image from "next/image";
import { useState } from "react";
import saveSvg from "../../assets/save.svg";

const timestampToIsoString = (timestamp) => new Date(timestamp * 1000).toISOString().substring(0, 10);

export default function EditDatesForm({ destination, onUpdateDetail }) {
  const [startDate, setStartDate] = useState(timestampToIsoString(destination.startDate));
  const [endDate, setEndDate] = useState(timestampToIsoString(destination.endDate));
  const [validationError, setValidationError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (Date.parse(startDate) - Date.parse(endDate) > 0) {
      setValidationError("You can travel back in time, but you can't travel backwards!");
      return;
    } else {
      setValidationError("");
    }

    onUpdateDetail(Date.parse(startDate) / 1000, Date.parse(endDate) / 1000);
  };

  return (
    <EditDates onSubmit={handleSubmit} aria-label="Edit dates form">
      <StyledLabel>Start Date</StyledLabel>
      <StyledInput
        aria-label="start Date"
        name="startDate"
        type="date"
        onChange={(event) => setStartDate(event.target.value)}
        value={startDate}
        required
      />
      <StyledLabel>End Date</StyledLabel>
      <StyledInput
        aria-label="end date"
        name="endDate"
        type="date"
        onChange={(event) => setEndDate(event.target.value)}
        value={endDate}
        required
      />
      {validationError && <ValidationError>{validationError}</ValidationError>}
      <StyledButton aria-label="save dates">
        <Image src={saveSvg} width="290px" height="40px" alt="Save icon" />
      </StyledButton>
    </EditDates>
  );
}

const ValidationError = styled.p`
  color: red;
  margin-bottom: 2em;
`;

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  border: none;
  background-color: transparent;
`;

const StyledInput = styled.input`
  margin: 0.5em 0 2em;
  width: 100%;
  height: 2em;
  filter: drop-shadow(0 0 0.2em var(--drop-shadow));
  transition: all ease-in-out 200ms;
  border: 0;
  border-radius: 50px;
  padding-left: 1.1em;
  padding-right: 0.5em;
  font-size: 1.2rem;
  outline: none;

  &:focus {
    filter: drop-shadow(0 0 0.4em var(--drop-shadow));
  }

  &::-webkit-calendar-picker-indicator {
    right: 0;
  }
`;

const StyledLabel = styled.h3`
  color: var(--drop-shadow);
`;

const EditDates = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
