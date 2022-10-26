import styled from "styled-components";
import editSvg from "../assets/edit.svg";
import Image from "next/image";

export default function DetailTitle({ name, toggleModal }) {
  return (
    <TitleName>
      {name}
      <EditButton onClick={toggleModal} aria-label={`Edit ${name}`}>
        <Image src={editSvg} width="20px" height="20px" alt="Edit icon" />
      </EditButton>
    </TitleName>
  );
}

const EditButton = styled.button`
  background-color: transparent;
  border: none;
`;

const TitleName = styled.h3`
  color: var(--drop-shadow);
  display: flex;
  justify-content: space-between;
`;
