import styled from "styled-components";
import Image from "next/image";
import trashCanSvg from "../../assets/trashCan.svg";
import crossIconSvg from "../../assets/cross.svg";

export default function DeleteButton(props) {
  return (
    <>
      <StyledDeleteButton {...props}>
        {props.icon === "trashCan" && (
          <Image src={trashCanSvg} width={props.width} height={props.height} alt="" />
        )}
        {props.icon === "cross" && (
          <Image src={crossIconSvg} width={props.width} height={props.height} alt="" />
        )}
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
