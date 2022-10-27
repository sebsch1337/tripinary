import styled from "styled-components";
import editSvg from "../assets/edit.svg";
import Image from "next/image";

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
