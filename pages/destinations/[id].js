import Head from "next/head";
import styled from "styled-components";
import { useRouter } from "next/router";
import useLocalStorage from "../../hooks/useLocalStorage";
import { dummyTrips, dummyDestinations } from "../../db";
import DestinationItem from "../../components/DestinationItem";

export default function Destinations() {
  const router = useRouter();
  const { id } = router.query;
  const [trips, setTrips] = useLocalStorage("trips", dummyTrips);
  const [destinations, setDestinations] = useLocalStorage(
    "destinations",
    dummyDestinations
  );

  let countryName = trips.find((trip) => trip.id == id)?.country || "Not found";
  let countryQueryName = countryName?.replaceAll(" ", "-");

  return (
    <>
      <Head>
        <title>{countryName.toUpperCase()}</title>
      </Head>
      <Cover
        image={`https://source.unsplash.com/random/?${countryQueryName}`}
      ></Cover>
      <MainCard>
        <DestinationHeadline>{countryName.toUpperCase()}</DestinationHeadline>
        <DestinationsWrapper>
          {destinations.map((destination) => {
            if (destination.tripId == id) {
              return (
                <DestinationItem key={destination.id} name={destination.name} />
              );
            }
          })}
        </DestinationsWrapper>
      </MainCard>
    </>
  );
}

const Cover = styled.header`
  width: 100%;
  height: 50%;
  background-color: red;
  position: fixed;
  background-size: cover;
  background-image: url(${(props) => props.image});
`;

const MainCard = styled.main`
  position: absolute;
  bottom: 0;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  background-color: var(--background-primary);
  width: 100%;
  height: 60%;
`;

const DestinationHeadline = styled.h1`
  margin: 1em 0 0.5em;
  text-align: center;
`;

const DestinationsWrapper = styled.ul`
  list-style: none;
  margin: 0 2em;
`;
