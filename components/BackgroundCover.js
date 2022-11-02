import styled from "styled-components";
import BackButton from "./Buttons/BackButton";

export default function BackgroundCover({ imageQuery }) {
  return (
    <Cover image={`https://source.unsplash.com/random/?${imageQuery}`}>
      <BackButton />
    </Cover>
  );
}

const Cover = styled.header`
  width: 100vw;
  height: 50vh;
  position: fixed;
  background-color: var(--background-primary);
  background-size: cover;
  background-image: url(${(props) => props.image});
`;
