import styled from "styled-components";

export default function Modal({ modalName, toggleModal }) {
  return (
    <BlurryBackground onClick={toggleModal}>
      <ModalBox onClick={(event) => event.stopPropagation()}>
        <ModalTitle>{modalName}</ModalTitle>
        <p>loremipsum..............</p>
        <p>loremipsum..............</p>
        <p>loremipsum..............</p>
        <p>loremipsum..............</p>
        <p>loremipsum..............</p>
      </ModalBox>
    </BlurryBackground>
  );
}

const ModalTitle = styled.h2`
  text-align: center;
`;

const ModalBox = styled.section`
  width: 90vw;
  padding: 2em;
  background-color: var(--background-primary);
  border-radius: 2em;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const BlurryBackground = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  backdrop-filter: blur(30px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
`;
