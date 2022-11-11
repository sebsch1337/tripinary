import styled from "styled-components";

export default function BackgroundCover({ imageQuery }) {
  return <Cover image={`https://source.unsplash.com/random/?${imageQuery}`} />;
}

const Cover = styled.div`
  width: 100vw;
  height: 50vh;
  position: fixed;
  background-color: var(--background-primary);
  background-size: cover;
  background-image: url(${(props) => props.image});
`;
