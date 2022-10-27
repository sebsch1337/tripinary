import styled from "styled-components";
import { useState } from "react";
import Image from "next/image";

export default function EditTextForm() {
  const [description, setDescription] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (event.target.description.value.every(" ")) {
      setValidationError("You can tYou can travel to space, but spaces only are not allowed!");
      return;
    } else {
      setValidationError("");
    }

    onUpdateDetail(Date.parse(startDate) / 1000, Date.parse(endDate) / 1000);
  };

  return (
    <EditForm onSubmit={handleSubmit} aria-label="Edit description form">
      <StyledInput
        aria-label="description"
        name="description"
        type="text"
        onChange={(event) => setDescription(event.target.value)}
        value={description}
        required
      />
      {validationError && <ValidationError>{validationError}</ValidationError>}
      <StyledButton aria-label="save description">
        <Image src={saveSvg} width="290px" height="40px" alt="Save icon" />
      </StyledButton>
    </EditForm>
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

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
