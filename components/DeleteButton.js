import styled from "styled-components";
import Image from "next/image";
import trashCanSvg from "../assets/trashCan.svg";

export default function DeleteButton({ onDelete }) {
  return (
    <StyledDeleteButton onClick={onDelete}>
      <Image src={trashCanSvg} width="25px" height="25px" alt="Trash can icon" />
    </StyledDeleteButton>
  );
}

const StyledDeleteButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
`;
