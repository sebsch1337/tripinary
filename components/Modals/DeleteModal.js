import styled from "styled-components";
import Image from "next/image";
import deleteButtonModalSvg from "../../assets/deleteButtonModal.svg";

export default function DeleteModal({ name, onClick }) {
  return (
    <DeleteSection>
      <DeleteText>{`Are you sure you want to delete ${name}?`}</DeleteText>
      <StyledButton onClick={onClick} aria-label={`Delete ${name}`}>
        <Image src={deleteButtonModalSvg} width="290px" height="40px" alt="Delete icon" />
      </StyledButton>
    </DeleteSection>
  );
}

const DeleteSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2em;
`;

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  border: none;
  background-color: transparent;
`;

const DeleteText = styled.p``;
