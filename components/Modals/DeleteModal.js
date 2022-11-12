import styled from "styled-components";
import ModalButton from "../Buttons/ModalButton";

export default function DeleteModal({ name, onClick }) {
  return (
    <DeleteSection>
      <DeleteText>{`Are you sure you want to delete ${
        name === "account" ? "your account and all your data" : name
      }?`}</DeleteText>
      <ModalButton onClick={onClick} aria-label={`Delete ${name}`} />
    </DeleteSection>
  );
}

const DeleteSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const DeleteText = styled.p``;
