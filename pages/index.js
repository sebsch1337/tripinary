import Head from "next/head";
import { useState } from "react";
import styled from "styled-components";
import TripCard from "../components/TripCard";
import { dbTrips } from "../db";

export default function Home() {
  const [trips, setTrips] = useState(dbTrips);
  return (
    <div>
      <Head>
        <title>Trips</title>
      </Head>
      <TripsHeadline>
        Start
        <br />
        your journey
      </TripsHeadline>
      <Main>
        <TripsWrapper>
          {trips.map((trip) => (
            <TripCard key={trip.id} country={trip.country} />
          ))}
        </TripsWrapper>
      </Main>
    </div>
  );
}

const TripsHeadline = styled.h1`
  margin: 1.5em 1em 1em 0.8em;
  font-size: 2.5rem;
  font-weight: 500;
`;

const Main = styled.main``;

const TripsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  flex-direction: column;
  gap: 2em;
`;
