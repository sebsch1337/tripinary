import Head from "next/head";
import styled from "styled-components";
import { useState } from "react";
import { getAllTrips } from "../services/tripService";
import TripList from "../components/Trip/TripList";
import Loader from "../components/Modals/Loader";

export async function getServerSideProps() {
  const tripsDb = await getAllTrips();

  return {
    props: { tripsDb: tripsDb },
  };
}

export default function Home({ tripsDb }) {
  const [trips, setTrips] = useState(tripsDb);
  const [loader, setLoader] = useState(false);

  const toggleLoader = () => setLoader((loader) => !loader);

  const onSubmitNewTrip = async (event) => {
    event.preventDefault();
    const countryName = event.target.country.value;

    toggleLoader();
    const res = await fetch("/api/trips", {
      method: "POST",
      body: countryName,
    });
    const newTrips = await res.json();
    toggleLoader();

    if (newTrips.error) return alert(newTrips.error);
    setTrips(newTrips);

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
      {loader && <Loader />}
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
