import styled from "styled-components";
import Image from "next/image";
import floppySvg from "../../assets/floppy.svg";
import CrossIconWhiteSvg from "../../assets/crossWhite.svg";

export default function ModalButton(props) {
  return (
    <StyledButton
      {...props}
      type={props.type}
      aria-label={props.type === "save" ? "save data" : "delete data"}
    >
      {props.type === "save" ? (
        <Image src={floppySvg} width="18px" height="18px" alt="" />
      ) : (
        <Image src={CrossIconWhiteSvg} width="18px" height="18px" alt="" />
      )}

      {props.type === "save" ? "Save" : "Delete"}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  border: none;
  padding: 0.3rem 1.5rem;
  height: 2.5rem;
  width: 100%;
  background: ${({ type }) => (type === "save" ? "var(--gradient-primary)" : "var(--gradient-secondary)")};
  border-radius: 2rem;
  color: #fff;
  font-size: 1.5rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  filter: drop-shadow(0 0 0.2rem var(--drop-shadow));
`;
