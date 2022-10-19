import Head from "next/head";
import styled from "styled-components";
import { useRouter } from "next/router";
import useLocalStorage from "../../hooks/useLocalStorage";
import { dummyTrips, dummyDestinations } from "../../db";
import { useEffect } from "react";
import bulletCircle from "../../assets/bulletCircle.svg";

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
        <title>{countryName}</title>
      </Head>
      <Cover
        image={`https://source.unsplash.com/random/?${countryQueryName}`}
      ></Cover>
      <MainCard>
        <DestinationHeadline>{countryName}</DestinationHeadline>
        <DestinationsWrapper bulletPoint={bulletCircle}>
          {destinations.map((destination) => {
            if (destination.tripId == id) {
              return (
                <DestinationItem key={destination.id}>
                  {destination.name}
                </DestinationItem>
              );
            }
          })}
        </DestinationsWrapper>
      </MainCard>
    </>
  );
}

const Cover = styled.header`
  width: 100vw;
  height: 50vh;
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
  width: 100vw;
  height: 60vh;
`;

const DestinationHeadline = styled.h1`
  margin: 1em 0 0.5em;
  text-align: center;
`;

const DestinationsWrapper = styled.ul`
  list-style: none;
  margin: 0 3em;
`;

const DestinationItem = styled.li`
  padding: 0.5em;
  font-size: 1.2rem;
`;
