import styled from "styled-components";
import BackButton from "./Buttons/BackButton";

export default function Header({ coverImage }) {
  return (
    <StyledHeader>
      <Cover image={`https://source.unsplash.com/random/?${coverImage?.replaceAll(" ", "-")}`} />
      <BackButton />
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
