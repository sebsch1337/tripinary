import styled from "styled-components";
import Image from "next/image";
import LogoutButton from "../Buttons/LogoutButton";
import UserButton from "../Buttons/UserButton";
import DeleteAccountButton from "../Buttons/DeleteAccountButton";

export default function UserProfile({ session, toggleShowProfile, signOut, deleteAccount }) {
  return (
    <BackgroundLayer onClick={toggleShowProfile}>
      <UserButton img={session.user.image} />
      <UserProfileBox onClick={(event) => event.stopPropagation()}>
        <UserInfoSection>
          <ProfileImage src={session.user.image} alt="profile picture" width="100px" height="100px" />
          <ProfileName>{session.user.name}</ProfileName>
          <ProfileEmail>{session.user.email}</ProfileEmail>
        </UserInfoSection>

        <DeleteAccountButton icon="cross" onClick={deleteAccount} />
        <LogoutButton onClick={signOut} />
      </UserProfileBox>
    </BackgroundLayer>
  );
}

const BackgroundLayer = styled.div`
  all: unset;
  top: 0;
  left: 0;
  transition: all 1s ease-in-out;
  width: 100%;
  min-height: 100vh;
  position: fixed;
  z-index: 30;
`;

const ProfileEmail = styled.p`
  font-size: 0.9rem;
`;

const ProfileName = styled.h3`
  margin-top: 0.5rem;
`;

const ProfileImage = styled(Image)`
  all: unset;
  border-radius: 100%;
`;

const UserInfoSection = styled.section`
  all: unset;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const UserProfileBox = styled.div`
  all: unset;
  position: absolute;
  top: 5rem;
  right: 2rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
  background-color: #fff;
  border-radius: 1rem;
  padding: 2rem;
  filter: drop-shadow(0 0 0.5rem var(--drop-shadow));
  z-index: 31;
`;
