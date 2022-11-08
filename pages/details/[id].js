import Head from "next/head";
import styled from "styled-components";
import { useState } from "react";

import BackgroundCover from "../../components/BackgroundCover";
import ToDoItem from "../../components/ToDo/ToDoItem";
import ToDoForm from "../../components/ToDo/ToDoForm";
import Modal from "../../components/Modals/Modal";
import Loader from "../../components/Modals/Loader";
import EditDatesForm from "../../components/Edit/EditDatesForm";
import EditTextForm from "../../components/Edit/EditTextForm";
import EditButton from "../../components/Buttons/EditButton";
import Footer from "../../components/Footer";
import Duration from "../../components/Duration";

import { getToDosByDestinationId } from "../../services/toDoService";
import { getDestinationById } from "../../services/destinationService";

export async function getServerSideProps(context) {
  const id = context.params.id;
  const destinationDB = await getDestinationById(id);
  const toDosDB = await getToDosByDestinationId(id);

  return {
    props: { id: id, destinationDB, toDosDB },
  };
}

export default function Details({ id, destinationDB, toDosDB }) {
  const [destination, setDestination] = useState(destinationDB);
  const [toDos, setToDos] = useState(toDosDB);
  const [modal, setModal] = useState({ visible: false, name: "" });
  const [loader, setLoader] = useState(false);

  const destinationName = destination?.name || "Not found";
  const destinationQueryName = destinationName.replaceAll(" ", "-");

  const toggleLoader = () => setLoader((loader) => !loader);

  const calculateDuration = () => (destination?.endDate - destination?.startDate) / 86400;

  const onToggleToDoItem = async (id, checked) => {
    toggleLoader();
    const res = await fetch("/api/todos/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: !checked }),
    });
    const newToDos = await res.json();
    setToDos(newToDos);
    toggleLoader();
  };

  const onDeleteToDoItem = async (id, destinationId) => {
    toggleLoader();
    const res = await fetch("/api/todos/" + id + "?destinationId=" + destinationId, {
      method: "DELETE",
    });
    const newToDos = await res.json();
    setToDos(newToDos);
    toggleLoader();
  };

  const toggleModal = (modalName = "") => setModal((modal) => ({ visible: !modal.visible, name: modalName }));

  const onUpdateDetail = async (updated) => {
    toggleLoader();
    const res = await fetch("/api/destinations/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...destination, ...updated }),
    });
    const newDestination = await res.json();
    setDestination(newDestination);
    toggleLoader();
  };

  const onSubmitNewToDoItem = async (toDo) => {
    toggleLoader();
    const res = await fetch("/api/todos/?destinationId=" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description: toDo }),
    });
    const newToDos = await res.json();
    setToDos(newToDos);
    toggleLoader();

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
              {toDos &&
                toDos.map((toDo) => (
                  <ToDoItem
                    key={toDo.id}
                    toDo={toDo}
                    onDeleteToDoItem={() => onDeleteToDoItem(toDo.id, toDo.destinationId)}
                    onToggleToDoItem={() => onToggleToDoItem(toDo.id, toDo.checked)}
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
      {loader && <Loader />}
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
