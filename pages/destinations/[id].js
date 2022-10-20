import Head from "next/head";
import styled from "styled-components";
import { useRouter } from "next/router";
import useLocalStorage from "../../hooks/useLocalStorage";
import { dummyTrips, dummyDestinations } from "../../db";
import DestinationItem from "../../components/DestinationItem";
import arrowBack from "../../assets/arrowBack.svg";
import Link from "next/link";
import Image from "next/image";

export default function Destinations() {
  const router = useRouter();
  const { id } = router.query;
  const [trips, setTrips] = useLocalStorage("trips", dummyTrips);
  const [destinations, setDestinations] = useLocalStorage(
    "destinations",
    dummyDestinations
  );

  const countryName =
    trips.find((trip) => trip.id === id)?.country || "Not found";
  const countryQueryName = countryName?.replaceAll(" ", "-");

  return (
    <>
      <Head>
        <title>{countryName.toUpperCase()}</title>
      </Head>
      <Cover image={`https://source.unsplash.com/random/?${countryQueryName}`}>
        <Link href="/" passHref>
          <LinkBox>
            <BackButton>
              <Image
                src={arrowBack.src}
                alt="Navigate to start page"
                width="40px"
                height="40px"
              />
            </BackButton>
          </LinkBox>
        </Link>
      </Cover>
      <MainCard>
        <DestinationHeadline>{countryName.toUpperCase()}</DestinationHeadline>
        <DestinationsWrapper>
          {destinations
            .filter((destination) => destination.tripId === id)
            .map((item) => (
              <DestinationItem key={item.id} name={item.name} />
            ))}
        </DestinationsWrapper>
      </MainCard>
    </>
  );
}

const LinkBox = styled.a`
  margin: 2em;
  position: absolute;
`;

const BackButton = styled.button`
  background-color: transparent;
  border: 0;
`;

const Cover = styled.header`
  width: 100vw;
  height: 50vh;
  background-color: var(--background-primary);
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
  margin: 0 2em;
`;
