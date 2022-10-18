import styled from "styled-components";

export default function TripCard({ country }) {
  return (
    <CardBox image={`https://source.unsplash.com/random/?${country}`}>
      <TextArea>
        <CountryName>{country}</CountryName>
      </TextArea>
    </CardBox>
  );
}

const CardBox = styled.button`
  width: 20em;
  height: 20em;
  filter: drop-shadow(0 0 1em #a1a1a1);
  background-size: cover;
  background-image: url(${(props) => props.image});
  border: 0;
  border-radius: 25px;
  overflow: hidden;
  position: relative;
`;

const TextArea = styled.span`
  height: 5em;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CountryName = styled.h2`
  color: #fafbff;
  font-size: 1.8rem;
  font-weight: 400;
`;
