import styled from "styled-components";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import UserProfile from "../../components/Modals/UserProfile";
import Loader from "../../components/Modals/Loader";
import Modal from "../../components/Modals/Modal";
import DeleteModal from "../../components/Modals/DeleteModal";
import EditDatesForm from "../../components/Edit/EditDatesForm";
import EditTextForm from "../../components/Edit/EditTextForm";
import EditButton from "../../components/Buttons/EditButton";
import ToDoItem from "../../components/ToDo/ToDoItem";
import ToDoForm from "../../components/ToDo/ToDoForm";
import Duration from "../../components/Duration";

import { getToDosByDestinationId } from "../../services/toDoService";
import { getDestinationById } from "../../services/destinationService";

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return { redirect: { destination: "/", permanent: false } };
  }

  const id = context.params.id;

  const destinationDB = await getDestinationById(id, session.user.email);
  const toDosDB = await getToDosByDestinationId(id, session.user.email);

  return {
    props: {
      id: id,
      destinationDB,
      toDosDB,
    },
  };
}

export default function Details({ id, destinationDB, toDosDB }) {
  const { data: session } = useSession();
  const [destination, setDestination] = useState(destinationDB);
  const [toDos, setToDos] = useState(toDosDB);
  const [modal, setModal] = useState({ visible: false, name: "" });
  const [loader, setLoader] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const destinationName = destinationDB ? destinationDB.name : "Not found";

  const toggleShowProfile = () => setShowProfile((showProfile) => !showProfile);
  const toggleLoader = () => setLoader((loader) => !loader);
  const toggleModal = (modalName = "", type = "") =>
    setModal((modal) => ({ visible: !modal.visible, name: modalName, type: type }));

  const onDeleteAccount = async () => {
    const res = await fetch("/api/trips", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    const deletedAccount = await res;
    if (deletedAccount.error) return alert(deletedAccount.error);
  };

  const calculateDuration = () => (destination?.endDate - destination?.startDate) / 86400;

  const onToggleToDoItem = async (id, checked) => {
    toggleLoader();
    const res = await fetch("/api/todos/" + id + "?destinationId=" + destination.id, {
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
      <Header
        coverImage={destinationName}
        showProfile={showProfile}
        session={session}
        toggleShowProfile={toggleShowProfile}
      />

      <MainCard>
        {showProfile && (
          <UserProfile
            session={session}
            toggleShowProfile={toggleShowProfile}
            showProfile={showProfile}
            deleteAccount={() => toggleModal("account", "account")}
            signOut={() => {
              toggleLoader();
              signOut();
            }}
          />
        )}
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
              placeholder="Accommodation"
              prevTextValue={destination.hotel}
              onUpdateDetail={(hotel) => {
                toggleModal();
                onUpdateDetail({ hotel });
              }}
            />
          )}
          {modal.name === "Transport" && (
            <EditTextForm
              placeholder="Flight / Bus / Train"
              prevTextValue={destination.transport}
              onUpdateDetail={(transport) => {
                toggleModal();
                onUpdateDetail({ transport });
              }}
            />
          )}
        </Modal>
      )}
      {modal.visible && modal.type === "account" && (
        <Modal name={`Delete ${modal.name}`} toggleModal={toggleModal}>
          <DeleteModal
            name={modal.name}
            onClick={async () => {
              toggleLoader();
              toggleModal();
              await onDeleteAccount();
              signOut();
            }}
          />
        </Modal>
      )}
      {loader && <Loader />}
    </>
  );
}

const ToDoWrapper = styled.ul`
  list-style: none;
  all: unset;
`;

const DetailTitle = styled.h3`
  color: var(--drop-shadow);
  display: flex;
  justify-content: space-between;
`;

const DetailText = styled.p`
  margin-bottom: 1rem;
`;

const DetailSection = styled.section`
  margin: 0 2rem 5rem;
`;

const MainCard = styled.main`
  position: absolute;
  top: 40vh;
  border-top-left-radius: 3rem;
  border-top-right-radius: 3rem;
  background-color: var(--background-primary);
  width: 100vw;
  overflow: hidden;
`;

const DetailHeadline = styled.h1`
  margin: 2rem 0 1rem;
  text-align: center;
`;
