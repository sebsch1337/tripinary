import styled from "styled-components";
import Image from "next/image";

export default function UserButton({ img, onClick }) {
  return (
    <StyledButton onClick={onClick}>
      <ProfileImage src={img} alt="profile picture" width="40px" height="40px" />
    </StyledButton>
  );
}

const ProfileImage = styled(Image)`
  all: unset;
  border-radius: 50%;
  overflow: hidden;
`;

const StyledButton = styled.button`
  all: unset;
  position: absolute;
  top: 2rem;
  right: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  filter: drop-shadow(0 0 0.1rem var(--drop-shadow));
`;
