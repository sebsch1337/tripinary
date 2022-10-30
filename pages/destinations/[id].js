import Head from "next/head";
import styled from "styled-components";
import { useRouter } from "next/router";
import useLocalStorage from "../../hooks/useLocalStorage";
import { dummyTrips, dummyDestinations } from "../../db";
import DestinationItem from "../../components/DestinationItem";
import DestinationForm from "../../components/DestinationForm";
import { v4 as uuid } from "uuid";
import BackgroundCover from "../../components/BackgroundCover";
import Footer from "../../components/Footer";
import DeleteButton from "../../components/DeleteButton";
import Modal from "../../components/Modal";
import DeleteModal from "../../components/DeleteModal";
import { useState } from "react";

export default function Destinations() {
  const router = useRouter();
  const { id } = router.query;
  const [trips, setTrips] = useLocalStorage("trips", dummyTrips);
  const [destinations, setDestinations] = useLocalStorage("destinations", dummyDestinations);
  const [modal, setModal] = useState({ visible: false, name: "", id: "" });

  const toggleModal = (modalName = "", type = "", id = "") =>
    setModal((modal) => ({ visible: !modal.visible, name: modalName, type: type, id: id }));

  const onDeleteDestination = (id) => {
    setDestinations((destinations) => destinations.filter((destination) => destination.id !== id));
  };

  const onDeleteTrip = (id) => {
    setTrips((trips) => trips.filter((trip) => trip.id !== id));
    setDestinations((destinations) => destinations.filter((destination) => destination.tripId !== id));
  };

  const onSubmitNewDestination = (event) => {
    event.preventDefault();
    const destinationName = event.target.destination.value;

    setDestinations((destinations) => {
      return [
        ...destinations,
        {
          id: uuid().slice(0, 8),
          name: destinationName,
          startDate: Math.floor(new Date().getTime() / 1000),
          endDate: Math.floor(new Date().getTime() / 1000),
          hotel: "",
          transport: "",
          tripId: id,
          toDos: [],
        },
      ];
    });

    event.target.reset();
    setTimeout(() => {
      window.scrollBy({ top: 100, behavior: "smooth" });
    }, 100);
  };

  const countryName = trips.find((trip) => trip.id === id)?.country || "Not found";
  const countryQueryName = countryName?.replaceAll(" ", "-");

  return (
    <>
      <Head>
        <title>{countryName.toUpperCase()}</title>
      </Head>
      <BackgroundCover imageQuery={countryQueryName} />
      <MainCard>
        <DestinationHeadline>{countryName.toUpperCase()}</DestinationHeadline>
        <DestinationsWrapper>
          {destinations
            .filter((destination) => destination.tripId === id)
            .map((item) => (
              <DestinationItem
                key={item.id}
                id={item.id}
                name={item.name}
                onClick={() => toggleModal(item.name, "destination", item.id)}
              />
            ))}
          <DestinationForm onSubmitNewDestination={onSubmitNewDestination} />
        </DestinationsWrapper>
      </MainCard>
      <Footer>
        <DeleteButton
          onClick={() => toggleModal(countryName, "trip")}
          icon="trashCan"
          width="25px"
          height="25px"
          ariaLabel="Delete trip"
        />
      </Footer>
      {modal.visible && modal.type === "trip" && (
        <Modal name={`Delete ${modal.name}`} toggleModal={toggleModal}>
          <DeleteModal
            name={modal.name}
            onClick={() => {
              router.push("/");
              onDeleteTrip(id);
            }}
          />
        </Modal>
      )}
      {modal.visible && modal.type === "destination" && (
        <Modal name={`Delete ${modal.name}`} toggleModal={toggleModal}>
          <DeleteModal
            name={modal.name}
            onClick={() => {
              toggleModal();
              onDeleteDestination(modal.id);
            }}
          />
        </Modal>
      )}
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

const DestinationHeadline = styled.h1`
  margin: 1em 0 0.5em;
  text-align: center;
`;

const DestinationsWrapper = styled.ul`
  list-style: none;
  margin: 0 2em 5em;
`;
