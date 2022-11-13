import styled from "styled-components";
import { useState } from "react";
import Input from "../FormElements/Input";
import ModalButton from "../Buttons/ModalButton";

export default function EditTextForm({ prevTextValue, onUpdateDetail, placeholder }) {
  const [description, setDescription] = useState(prevTextValue);

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateDetail(event.target.description.value.trim());
  };

  return (
    <EditForm onSubmit={handleSubmit} aria-label="Edit description form">
      <Input
        aria-label="description"
        name="description"
        onChange={(event) => setDescription(event.target.value)}
        value={description}
        placeholder={placeholder}
      />
      <ModalButton type="save" />
    </EditForm>
  );
}

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
`;
