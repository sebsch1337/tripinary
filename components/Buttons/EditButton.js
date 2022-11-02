import styled from "styled-components";
import Image from "next/image";
import editSvg from "../../assets/edit.svg";

export default function EditButton({ toggleModal, name }) {
  return (
    <StyledEditButton onClick={toggleModal} aria-label={`Edit ${name}`}>
      <Image src={editSvg} width="18px" height="18px" alt="Edit icon" />
    </StyledEditButton>
  );
}

const StyledEditButton = styled.button`
  background-color: transparent;
  border: none;
`;
