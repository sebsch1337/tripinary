import styled from "styled-components";
import BackButton from "./Buttons/BackButton";
import UserButton from "./Buttons/UserButton";

export default function Header({ coverImage, showProfile, session, toggleShowProfile }) {
  return (
    <StyledHeader>
      <Cover image={`https://source.unsplash.com/random/?${coverImage?.replaceAll(" ", "-")}`} />
      <BackButton />
      {!showProfile && session && <UserButton img={session.user.image} onClick={toggleShowProfile} />}
    </StyledHeader>
  );
}

const StyledHeader = styled.header``;

const Cover = styled.div`
  width: 100vw;
  height: 50vh;
  position: fixed;
  background-color: var(--background-primary);
  background-size: cover;
  background-image: url(${(props) => props.image});
`;
