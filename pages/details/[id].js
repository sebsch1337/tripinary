import Head from "next/head";
import styled from "styled-components";
import { useRouter } from "next/router";
import { v4 as uuid } from "uuid";
import useLocalStorage from "../../hooks/useLocalStorage";
import { dummyDestinations } from "../../db";
import BackgroundCover from "../../components/BackgroundCover";
import ToDoItem from "../../components/ToDoItem";
import ToDoForm from "../../components/ToDoForm";

export default function Details() {
  const router = useRouter();
  const { id } = router.query;
  const [destinations, setDestinations] = useLocalStorage("destinations", dummyDestinations);

  const destination = destinations.find((destinationItem) => destinationItem.id === id);

  const destinationName = destination?.name || "Not found";
  const destinationQueryName = destinationName.replaceAll(" ", "-");

  const onSubmitNewToDoItem = (event, destinationId) => {
    event.preventDefault();

    const toDoDescription = event.target.todo.value;

    setDestinations((destinations) => {
      const updatedDestinations = destinations.map((destination) => {
        if (destination.id === destinationId) {
          return {
            ...destination,
            toDos: [
              ...destination.toDos,
              { id: uuid().slice(0, 8), description: toDoDescription, checked: false },
            ],
          };
        } else {
          return destination;
        }
      });
      return updatedDestinations;
    });

    event.target.reset();
    setTimeout(() => {
      window.scrollBy({ top: 100, behavior: "smooth" });
    }, 100);
  };

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
            <DetailTitle>To-Do</DetailTitle>
            <ToDoWrapper>
              {destination.toDos.map((toDo) => (
                <ToDoItem key={toDo.id} toDo={toDo} />
              ))}
            </ToDoWrapper>
            <ToDoForm destinationId={destination.id} onSubmitNewToDoItem={onSubmitNewToDoItem} />
          </DetailSection>
        )}
      </MainCard>
    </>
  );
}

const ToDoWrapper = styled.ul`
  list-style: none;
`;

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
