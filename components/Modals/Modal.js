import styled from "styled-components";

export default function Modal({ name, toggleModal, children }) {
  return (
    <BlurryBackground onClick={toggleModal}>
      <ModalBox onClick={(event) => event.stopPropagation()}>
        <ModalTitle>{name}</ModalTitle>
        {children}
      </ModalBox>
    </BlurryBackground>
  );
}

const ModalTitle = styled.h2`
  text-align: center;
  margin-bottom: 1em;
`;

const ModalBox = styled.section`
  width: 90vw;
  padding: 2em;
  background-color: #fff;
  border-radius: 2em;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const BlurryBackground = styled.div`
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  position: fixed;
  backdrop-filter: blur(30px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;
