import Head from "next/head";
import styled from "styled-components";
import { useRouter } from "next/router";
import useLocalStorage from "../../hooks/useLocalStorage";
import { dummyTrips, dummyDestinations } from "../../db";
import Link from "next/link";
import Image from "next/image";
import { v4 as uuid } from "uuid";
import BackArrow from "../../components/BackButton";
import BackgroundCover from "../../components/BackgroundCover";

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
        <title>{destinationName.toUpperCase()}</title>
      </Head>
      <BackgroundCover imageQuery={destinationQueryName} />
      <MainCard>
        <DetailHeadline>{destinationName.toUpperCase()}</DetailHeadline>
      </MainCard>
    </>
  );
}

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
