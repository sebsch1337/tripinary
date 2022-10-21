import Head from "next/head";
import styled from "styled-components";
import { useRouter } from "next/router";
import useLocalStorage from "../../hooks/useLocalStorage";
import { dummyTrips, dummyDestinations } from "../../db";
import Link from "next/link";
import Image from "next/image";
import { v4 as uuid } from "uuid";
import BackArrow from "../../components/BackButton";

export default function Details() {
  const router = useRouter();
  const { id } = router.query;
  const [destinations, setDestinations] = useLocalStorage(
    "destinations",
    dummyDestinations
  );

  const destinationName =
    destinations.find((destination) => destination.id === id)?.name ||
    "Not found";
  const destinationQueryName = destinationName?.replaceAll(" ", "-");

  return (
    <>
      <Head>
        <title></title>
      </Head>
      <Cover
        image={`https://source.unsplash.com/random/?${destinationQueryName}`}
      >
        <BackArrow />
      </Cover>
      <MainCard>
        <DetailHeadline>{destinationName.toUpperCase()}</DetailHeadline>
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

const DetailHeadline = styled.h1`
  margin: 1em 0 0.5em;
  text-align: center;
`;
