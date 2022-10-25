import styled from "styled-components";

export default function Modal({ modalName }) {
  return (
    <BlurryBackground>
      <ModalBox>
        <ModalTitle>{modalName}</ModalTitle>
      </ModalBox>
    </BlurryBackground>
  );
}

const ModalTitle = styled.h2`
  text-align: center;
`;

const ModalBox = styled.section`
  width: 90vw;
  height: 10vh;
  background-color: var(--background-primary);
  border-radius: 2em;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const BlurryBackground = styled.div`
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(30px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
`;
