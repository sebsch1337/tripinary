import styled from "styled-components";

export default function TripCard({ country }) {
  const countryQueryName = country.replaceAll(" ", "-");
  return (
    <CardBox image={`https://source.unsplash.com/random/?${countryQueryName}`}>
      <TextArea>
        <CountryName>{country}</CountryName>
      </TextArea>
    </CardBox>
  );
}

const CardBox = styled.button`
  all: unset;
  width: 17rem;
  height: 17rem;
  background-size: cover;
  background-image: url(${(props) => props.image});
  border: 0;
  border-radius: 25px;
  position: relative;
  overflow: hidden;
  filter: drop-shadow(0 0 1em var(--drop-shadow));
`;

const TextArea = styled.span`
  height: 5rem;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CountryName = styled.h2`
  color: #fff;
  font-size: 1.8rem;
  font-weight: 400;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 0.5em;
`;
