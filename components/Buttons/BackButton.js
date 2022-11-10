import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/router";
import arrowBack from "../../assets/arrowBack.svg";

export default function BackButton() {
  const router = useRouter();

  return (
    <StyledButton onClick={() => router.back()}>
      <Image src={arrowBack.src} alt="Navigate to start page" width="35px" height="35px" />
    </StyledButton>
  );
}

const StyledButton = styled.button`
  all: unset;
  position: absolute;
  top: 2rem;
  left: 2rem;
`;
