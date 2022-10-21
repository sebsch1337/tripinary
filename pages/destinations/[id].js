import Head from "next/head";
import styled from "styled-components";
import { useRouter } from "next/router";
import useLocalStorage from "../../hooks/useLocalStorage";
import { dummyTrips, dummyDestinations } from "../../db";
import DestinationItem from "../../components/DestinationItem";
import Link from "next/link";
import Image from "next/image";
import DestinationForm from "../../components/DestinationForm";
import { v4 as uuid } from "uuid";
import BackArrow from "../../components/BackButton";

export default function Destinations() {
  const router = useRouter();
  const { id } = router.query;
  const [trips, setTrips] = useLocalStorage("trips", dummyTrips);
  const [destinations, setDestinations] = useLocalStorage(
    "destinations",
    dummyDestinations
  );

  const onSubmitNewDestination = (event) => {
    event.preventDefault();
    const destinationName = event.target.destination.value;

    setDestinations((destinations) => {
      return [
        ...destinations,
        {
          id: uuid().slice(0, 8),
          name: destinationName,
          tripId: id,
        },
      ];
    });

    event.target.reset();
    setTimeout(() => {
      window.scrollBy({ top: 100, behavior: "smooth" });
    }, 100);
  };

  const countryName =
    trips.find((trip) => trip.id === id)?.country || "Not found";
  const countryQueryName = countryName?.replaceAll(" ", "-");

  return (
    <>
      <Head>
        <title>{countryName.toUpperCase()}</title>
      </Head>
      <Cover image={`https://source.unsplash.com/random/?${countryQueryName}`}>
        <BackArrow />
      </Cover>
      <MainCard>
        <DestinationHeadline>{countryName.toUpperCase()}</DestinationHeadline>
        <DestinationsWrapper>
          {destinations
            .filter((destination) => destination.tripId === id)
            .map((item) => (
              <DestinationItem key={item.id} name={item.name} />
            ))}
          <DestinationForm onSubmitNewDestination={onSubmitNewDestination} />
        </DestinationsWrapper>
      </MainCard>
    </>
  );
}

const Cover = styled.header`
  width: 100vw;
  height: 50vh;
  position: fixed;
  background-color: var(--background-primary);
  background-size: cover;
  background-image: url(${(props) => props.image});
`;

const MainCard = styled.main`
  position: absolute;
  top: 40vh;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  background-color: var(--background-primary);
  width: 100vw;
`;

const DestinationHeadline = styled.h1`
  margin: 1em 0 0.5em;
  text-align: center;
`;

const DestinationsWrapper = styled.ul`
  list-style: none;
  margin: 0 2em;
`;
