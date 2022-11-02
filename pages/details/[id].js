import Head from "next/head";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useState } from "react";
import { v4 as uuid } from "uuid";

import BackgroundCover from "../../components/BackgroundCover";
import ToDoItem from "../../components/ToDo/ToDoItem";
import ToDoForm from "../../components/ToDo/ToDoForm";
import Modal from "../../components/Modals/Modal";
import EditDatesForm from "../../components/Edit/EditDatesForm";
import EditTextForm from "../../components/Edit/EditTextForm";
import EditButton from "../../components/Buttons/EditButton";
import Footer from "../../components/Footer";
import Duration from "../../components/Duration";

import useLocalStorage from "../../hooks/useLocalStorage";
import { dummyDestinations } from "../../db";

export default function Details() {
  const router = useRouter();
  const { id } = router.query;
  const [destinations, setDestinations] = useLocalStorage("destinations", dummyDestinations);
  const [modal, setModal] = useState({ visible: false, name: "" });

  const destination = destinations.find((destinationItem) => destinationItem.id === id);

  const destinationName = destination?.name || "Not found";
  const destinationQueryName = destinationName.replaceAll(" ", "-");

  const calculateDuration = () => (destination?.endDate - destination?.startDate) / 86400;

  const onToggleToDoItem = (id) =>
    setDestinations((destinations) =>
      destinations.map((destinationItem) =>
        destinationItem.id === destination.id
          ? {
              ...destinationItem,
              toDos: destinationItem.toDos.map((toDo) =>
                toDo.id === id ? { ...toDo, checked: !toDo.checked } : toDo
              ),
            }
          : destinationItem
      )
    );
  const onDeleteToDoItem = (id) =>
    setDestinations((destinations) =>
      destinations.map((destinationItem) =>
        destinationItem.id === destination.id
          ? {
              ...destinationItem,
              toDos: destinationItem.toDos.filter((toDo) => toDo.id !== id),
            }
          : destinationItem
      )
    );

  const toggleModal = (modalName = "") => setModal((modal) => ({ visible: !modal.visible, name: modalName }));

  const onUpdateDetail = (updated) => {
    setDestinations((destinations) => {
      return destinations.map((destinationItem) => {
        if (destinationItem.id === destination.id) {
          return {
            ...destinationItem,
            ...updated,
          };
        } else {
          return destinationItem;
        }
      });
    });
  };

  const onSubmitNewToDoItem = (toDo) => {
    setDestinations((destinations) => {
      return destinations.map((destinationItem) => {
        if (destinationItem.id === destination.id) {
          return {
            ...destinationItem,
            toDos: [...destinationItem.toDos, { id: uuid().slice(0, 8), description: toDo, checked: false }],
          };
        } else {
          return destinationItem;
        }
      });
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
            <DetailTitle>
              Dates
              <EditButton toggleModal={() => toggleModal("Dates")} />
            </DetailTitle>
            <DetailText>
              {new Date(destination.startDate * 1000).toISOString().substring(0, 10) +
                ` until ` +
                new Date(destination.endDate * 1000).toISOString().substring(0, 10)}
            </DetailText>
            <DetailTitle>
              Hotel
              <EditButton toggleModal={() => toggleModal("Hotel")} />
            </DetailTitle>
            <DetailText>{destination.hotel === "" ? "<No hotel booked yet>" : destination.hotel}</DetailText>
            <DetailTitle>
              Transport
              <EditButton toggleModal={() => toggleModal("Transport")} />
            </DetailTitle>
            <DetailText>
              {destination.transport === "" ? "<No transportation booked yet>" : destination.transport}
            </DetailText>
            <DetailTitle>To-Do</DetailTitle>
            <ToDoWrapper>
              {destination.toDos.map((toDo) => (
                <ToDoItem
                  key={toDo.id}
                  toDo={toDo}
                  onDeleteToDoItem={() => onDeleteToDoItem(toDo.id)}
                  onToggleToDoItem={() => onToggleToDoItem(toDo.id)}
                />
              ))}
            </ToDoWrapper>
            <ToDoForm onSubmitNewToDoItem={onSubmitNewToDoItem} />
          </DetailSection>
        )}
      </MainCard>
      <Footer>
        <Duration title="Duration" number={calculateDuration()} type="night" />
      </Footer>
      {modal.visible && (
        <Modal name={modal.name} toggleModal={toggleModal}>
          {modal.name === "Dates" && (
            <EditDatesForm
              destination={destination}
              onUpdateDetail={(startDate, endDate) => {
                toggleModal();
                onUpdateDetail({ startDate, endDate });
              }}
            />
          )}
          {modal.name === "Hotel" && (
            <EditTextForm
              prevTextValue={destination.hotel}
              onUpdateDetail={(hotel) => {
                toggleModal();
                onUpdateDetail({ hotel });
              }}
            />
          )}
          {modal.name === "Transport" && (
            <EditTextForm
              prevTextValue={destination.transport}
              onUpdateDetail={(transport) => {
                toggleModal();
                onUpdateDetail({ transport });
              }}
            />
          )}
        </Modal>
      )}
    </>
  );
}

const ToDoWrapper = styled.ul`
  list-style: none;
`;

const DetailTitle = styled.h3`
  color: var(--drop-shadow);
  display: flex;
  justify-content: space-between;
`;

const DetailText = styled.p`
  margin-bottom: 1em;
`;

const DetailSection = styled.section`
  margin: 0 2em 5em;
`;

const MainCard = styled.main`
  position: absolute;
  top: 40vh;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  background-color: var(--background-primary);
  width: 100vw;
  overflow: hidden;
`;

const DetailHeadline = styled.h1`
  margin: 1em 0 0.5em;
  text-align: center;
`;
