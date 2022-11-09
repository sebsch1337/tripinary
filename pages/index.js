import Head from "next/head";
import styled from "styled-components";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { getAllTrips } from "../services/tripService";

import TripList from "../components/Trip/TripList";
import Loader from "../components/Modals/Loader";
import LoginGithubButton from "../components/Buttons/LoginGithubButton";

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);

  if (session) {
    const tripsDb = await getAllTrips(session.user.email);
    return { props: { tripsDb: tripsDb } };
  }

  return { props: {} };
}

export default function Home({ tripsDb }) {
  const { data: session } = useSession();
  const [trips, setTrips] = useState(tripsDb);
  const [loader, setLoader] = useState(false);

  const toggleLoader = () => setLoader((loader) => !loader);

  const onSubmitNewTrip = async (event) => {
    event.preventDefault();
    const countryName = event.target.country.value;

    toggleLoader();
    const res = await fetch("/api/trips", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ country: countryName, userEmail: session.user.email }),
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
      {session ? (
        <>
          <TripsHeadline>
            Start
            <br />
            your journey
          </TripsHeadline>
          <Main>
            <TripList trips={trips} onSubmitNewTrip={onSubmitNewTrip} />
            <LoginGithubButton onClick={signOut} />
          </Main>
        </>
      ) : (
        <LoginMain>
          <LoginHeadline>
            Login
            <br />
            to start your journey
          </LoginHeadline>
          <LoginGithubButton onClick={signIn} />
        </LoginMain>
      )}
      {loader && <Loader />}
    </>
  );
}

const TripsHeadline = styled.h1`
  margin: 1.5em 1em 1em 0.8em;
  font-size: 2.5rem;
  font-weight: 500;
`;

const LoginHeadline = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
`;

const LoginMain = styled.main`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
`;

const Main = styled.main`
  margin-bottom: 2em;
`;
