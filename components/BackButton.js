import styled from "styled-components";
import { useRouter } from "next/router";
import Image from "next/image";
import arrowBack from "../assets/arrowBack.svg";

export default function BackArrow() {
  const router = useRouter();

  return (
    <BackButton onClick={() => router.back()}>
      <Image
        src={arrowBack.src}
        alt="Navigate to start page"
        width="40px"
        height="40px"
      />
    </BackButton>
  );
}

const BackButton = styled.button`
  margin: 2em;
  position: absolute;
  background-color: transparent;
  border: 0;
`;
