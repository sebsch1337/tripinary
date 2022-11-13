import styled from "styled-components";
import { useState } from "react";
import Input from "../FormElements/Input";
import ModalButton from "../Buttons/ModalButton";

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
      <InputWrapper>
        <StyledLabel>Start Date</StyledLabel>
        <Input
          aria-label="start Date"
          name="startDate"
          type="date"
          onChange={(event) => setStartDate(event.target.value)}
          value={startDate}
          required={true}
        />
      </InputWrapper>
      <InputWrapper>
        <StyledLabel>End Date</StyledLabel>
        <Input
          aria-label="end date"
          name="endDate"
          type="date"
          onChange={(event) => setEndDate(event.target.value)}
          value={endDate}
          min={startDate}
          required={true}
        />
      </InputWrapper>

      {validationError && <ValidationError>{validationError}</ValidationError>}
      <ModalButton type="save" />
    </EditDates>
  );
}

const InputWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const ValidationError = styled.p`
  color: red;
  margin-bottom: 2rem;
`;

const StyledLabel = styled.h3`
  color: var(--drop-shadow);
`;

const EditDates = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
`;
