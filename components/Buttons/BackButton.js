import styled from "styled-components";
import { useRouter } from "next/router";
import Image from "next/image";
import arrowSvg from "../../assets/arrow.svg";

export default function BackButton() {
  const router = useRouter();

  return (
    <StyledButton onClick={() => router.back()} aria-label="Navigate back">
      <Image src={arrowSvg} alt="" width="20px" height="20px" />
    </StyledButton>
  );
}

const StyledButton = styled.button`
  all: unset;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 100%;
  background: var(--gradient-primary);
  position: absolute;
  top: 2rem;
  left: 2rem;
`;
