import Head from "next/head";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import TripList from "../components/Trip/TripList";

import useLocalStorage from "../hooks/useLocalStorage";
import { dummyTrips } from "../db";

export default function Home() {
  const [trips, setTrips] = useLocalStorage("trips", dummyTrips);

  const onSubmitNewTrip = (event) => {
    event.preventDefault();
    const countryName = event.target.country.value;

    setTrips((trips) => {
      return [
        ...trips,
        {
          id: uuid().slice(0, 8),
          country: countryName,
        },
      ];
    });

    event.target.reset();
    setTimeout(() => {
      window.scrollBy({ top: 300, behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      <Head>
        <title>START YOUR JOURNEY</title>
      </Head>
      <TripsHeadline>
        Start
        <br />
        your journey
      </TripsHeadline>
      <Main>
        <TripList trips={trips} onSubmitNewTrip={onSubmitNewTrip} />
      </Main>
    </>
  );
}

const TripsHeadline = styled.h1`
  margin: 1.5em 1em 1em 0.8em;
  font-size: 2.5rem;
  font-weight: 500;
`;

const Main = styled.main`
  margin-bottom: 2em;
`;
