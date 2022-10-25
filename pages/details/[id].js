import Head from "next/head";
import styled from "styled-components";
import { useRouter } from "next/router";
import { v4 as uuid } from "uuid";
import useLocalStorage from "../../hooks/useLocalStorage";
import { dummyDestinations } from "../../db";
import BackgroundCover from "../../components/BackgroundCover";
import ToDoItem from "../../components/ToDoItem";
import ToDoForm from "../../components/ToDoForm";
import Modal from "../../components/Modal";
import { useState } from "react";
import DetailTitle from "../../components/DetailTitle";
import EditDatesForm from "../../components/EditDatesForm";

export default function Details() {
  const router = useRouter();
  const { id } = router.query;
  const [destinations, setDestinations] = useLocalStorage("destinations", dummyDestinations);
  const [modal, setModal] = useState({ visible: false, name: "" });

  const destination = destinations.find((destinationItem) => destinationItem.id === id);

  const destinationName = destination?.name || "Not found";
  const destinationQueryName = destinationName.replaceAll(" ", "-");

  const toggleModal = (modalName = "") => {
    setModal((modal) => {
      return { visible: !modal.visible, name: modalName };
    });
  };

  const onSubmitNewToDoItem = (toDo) => {
    setDestinations((destinations) => {
      const updatedDestinations = destinations.map((destinationItem) => {
        if (destinationItem.id === destination.id) {
          return {
            ...destinationItem,
            toDos: [
              ...destinationItem.toDos,
              { id: uuid().slice(0, 8), description: toDo, checked: false },
            ],
          };
        } else {
          return destinationItem;
        }
      });
      return updatedDestinations;
    });

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
            <DetailTitle name="Dates" toggleModal={() => toggleModal("Dates")} />
            <DetailText>
              {new Date(destination.startDate * 1000).toISOString().substring(0, 10) +
                ` until ` +
                new Date(destination.endDate * 1000).toISOString().substring(0, 10)}
            </DetailText>
            <DetailTitle name="Hotel" toggleModal={() => toggleModal("Hotel")} />
            <DetailText>{destination.hotel}</DetailText>
            <DetailTitle name="Transport" toggleModal={() => toggleModal("Transport")} />
            <DetailText>{destination.transport}</DetailText>
            <DetailTitle name="To-Do" toggleModal={() => toggleModal("To-Do")} />
            <ToDoWrapper>
              {destination.toDos.map((toDo) => (
                <ToDoItem key={toDo.id} toDo={toDo} />
              ))}
            </ToDoWrapper>
            <ToDoForm onSubmitNewToDoItem={onSubmitNewToDoItem} />
          </DetailSection>
        )}
      </MainCard>
      {modal.visible && (
        <Modal modalName={modal.name} toggleModal={toggleModal}>
          {modal.name === "Dates" && <EditDatesForm />}
        </Modal>
      )}
    </>
  );
}

const ToDoWrapper = styled.ul`
  list-style: none;
`;

const DetailText = styled.p`
  margin-bottom: 1em; ;
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
