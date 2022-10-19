import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import TripCard from "../components/TripCard";
import TripForm from "../components/TripForm";
import { v4 as uuid } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Home() {
  const [trips, setTrips] = useLocalStorage("trips", []);

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
  };

  return (
    <>
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
            <Link key={trip.id} href={`/destinations/${trip.id}`} passHref>
              <a>
                <TripCard country={trip.country} />
              </a>
            </Link>
          ))}
          <TripForm onSubmitNewTrip={onSubmitNewTrip} />
        </TripsWrapper>
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

const TripsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  flex-direction: column;
  gap: 2em;
`;
