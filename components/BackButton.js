import styled from "styled-components";
import { useRouter } from "next/router";
import Image from "next/image";
import arrowBack from "../assets/arrowBack.svg";

export default function BackButton() {
  const router = useRouter();

  return (
    <StyledButton onClick={() => router.back()}>
      <Image src={arrowBack.src} alt="Navigate to start page" width="40px" height="40px" />
    </StyledButton>
  );
}

const StyledButton = styled.button`
  margin: 2em;
  position: absolute;
  background-color: transparent;
  border: none;
  filter: drop-shadow(0 0 0.1em var(--drop-shadow));
`;
