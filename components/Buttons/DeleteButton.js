import styled from "styled-components";
import Image from "next/image";
import trashCanSvg from "../../assets/trashCan.svg";
import crossSvg from "../../assets/cross.svg";

export default function DeleteButton({ onClick, icon, width, height, ariaLabel, right }) {
  return (
    <>
      <StyledDeleteButton onClick={onClick} aria-label={ariaLabel} right={right}>
        {icon === "trashCan" && (
          <Image src={trashCanSvg} width={width} height={height} alt="Trash can icon" />
        )}
        {icon === "cross" && <Image src={crossSvg} width={width} height={height} alt="Cross icon" />}
      </StyledDeleteButton>
    </>
  );
}

const StyledDeleteButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  ${({ right }) => right && `position: absolute; right: ${right}`};
`;
