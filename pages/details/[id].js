import Head from "next/head";
import styled from "styled-components";
import { useRouter } from "next/router";
import useLocalStorage from "../../hooks/useLocalStorage";
import { dummyDestinations } from "../../db";
import BackgroundCover from "../../components/BackgroundCover";

export default function Details() {
  const router = useRouter();
  const { id } = router.query;
  const [destinations] = useLocalStorage("destinations", dummyDestinations);

  const destination = destinations.find((destinationItem) => destinationItem.id === id);

  const destinationName = destination?.name || "Not found";
  const destinationQueryName = destinationName.replaceAll(" ", "-");

  return (
    <>
      <Head>
        <title>{destinationName.toUpperCase()}</title>
      </Head>
      <BackgroundCover imageQuery={destinationQueryName} />
      <MainCard>
        <DetailHeadline>{destinationName.toUpperCase()}</DetailHeadline>
        {destination && (
          <DetailSection>
            <DetailTitle>Date</DetailTitle>
            <DetailText>
              {new Date(destination.startDate * 1000).toISOString().substring(0, 10) +
                ` until ` +
                new Date(destination.endDate * 1000).toISOString().substring(0, 10)}
            </DetailText>
            <DetailTitle>Hotel</DetailTitle>
            <DetailText>{destination.hotel}</DetailText>
            <DetailTitle>Transport</DetailTitle>
            <DetailText>{destination.transport}</DetailText>
          </DetailSection>
        )}
      </MainCard>
    </>
  );
}

const DetailText = styled.p`
  margin-bottom: 1em; ;
`;

const DetailTitle = styled.h3`
  color: var(--drop-shadow);
`;

const DetailSection = styled.section`
  margin: 0 2em;
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
