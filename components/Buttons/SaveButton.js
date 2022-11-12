import styled from "styled-components";
import Image from "next/image";
import floppySvg from "../../assets/floppy.svg";

export default function SaveButton(props) {
  return (
    <StyledButton {...props} aria-label="save data">
      <Image src={floppySvg} width="18px" height="18px" alt="" />
      Save
    </StyledButton>
  );
}

const StyledButton = styled.button`
  border: none;
  padding: 0.3rem 1.5rem;
  height: 2.5rem;
  width: 100%;
  background: linear-gradient(135deg, rgba(49, 107, 255, 1) 0%, rgba(255, 255, 255, 1) 200%);
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
