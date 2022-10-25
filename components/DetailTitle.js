import styled from "styled-components";
import editSvg from "../assets/edit.svg";
import Image from "next/image";

export default function DetailTitle({ name, toggleModal }) {
  return (
    <DetailTitleWrapper>
      <TitleName>{name}</TitleName>
      <EditButton onClick={toggleModal} aria-label={`Edit ${name}`}>
        <Image src={editSvg} width="20px" height="20px" alt="Edit icon" />
      </EditButton>
    </DetailTitleWrapper>
  );
}

const DetailTitleWrapper = styled.span`
  display: flex;
  justify-content: space-between;
`;
const EditButton = styled.button`
  background-color: transparent;
  border: none;
`;

const TitleName = styled.h3`
  color: var(--drop-shadow);
`;
