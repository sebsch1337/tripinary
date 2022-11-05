import Head from "next/head";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useState } from "react";

import BackgroundCover from "../../components/BackgroundCover";
import Footer from "../../components/Footer";
import DeleteButton from "../../components/Buttons/DeleteButton";
import Modal from "../../components/Modals/Modal";
import Loader from "../../components/Modals/Loader";
import DeleteModal from "../../components/Modals/DeleteModal";
import Duration from "../../components/Duration";
import DestinationList from "../../components/Destination/DestinationList";

import { getTripById } from "../../services/tripService";
import { getDestinationsByTripId } from "../../services/destinationService";

export async function getServerSideProps(context) {
  const id = context.params.id;
  const trip = await getTripById(id);
  const destinationsDB = await getDestinationsByTripId(id);

  return {
    props: { id: id, destinationsDB, country: trip?.error ? "Not found" : trip },
  };
}

export default function Destinations({ id, destinationsDB, country }) {
  const router = useRouter();

  const [destinations, setDestinations] = useState(destinationsDB);
  const [modal, setModal] = useState({ visible: false, name: "", id: "" });
  const [loader, setLoader] = useState(false);

  const toggleLoader = () => setLoader((loader) => !loader);

  const calculateTotalDuration = () => {
    const minDate = Math.min(
      ...destinations.filter((filtered) => filtered.tripId === id).map((destination) => destination.startDate)
    );
    const maxDate = Math.max(
      ...destinations.filter((filtered) => filtered.tripId === id).map((destination) => destination.endDate)
    );
    const dayDifference = (maxDate - minDate) / 86400 + 1;
    return dayDifference > 0 ? dayDifference : 0;
  };

  const toggleModal = (modalName = "", type = "", id = "") =>
    setModal((modal) => ({ visible: !modal.visible, name: modalName, type: type, id: id }));

  const onDeleteDestination = async (id, tripId) => {
    toggleLoader();
    const res = await fetch("/api/destinations/" + id + "?tripId=" + tripId, {
      method: "DELETE",
    });
    const newDestinations = await res.json();
    setDestinations(newDestinations);
    toggleLoader();
  };

  const onDeleteTrip = async (id) => await fetch("/api/trips/" + id, { method: "DELETE" });

  const onSubmitNewDestination = async (event) => {
    event.preventDefault();
    const destinationName = event.target.destination.value;

    toggleLoader();
    const res = await fetch("/api/destinations/?tripId=" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: destinationName }),
    });
    const newTrips = await res.json();
    toggleLoader();

    setDestinations(newTrips);

    event.target.reset();
    setTimeout(() => {
      window.scrollBy({ top: 100, behavior: "smooth" });
    }, 100);
  };

  const countryQueryName = country?.replaceAll(" ", "-");

  return (
    <>
      <Head>
        <title>{country.toUpperCase()}</title>
      </Head>
      <BackgroundCover imageQuery={countryQueryName} />
      <MainCard>
        <DestinationHeadline>{country.toUpperCase()}</DestinationHeadline>
        {country !== "Not found" && (
          <DestinationList
            destinations={destinations}
            tripId={id}
            onSubmitNewDestination={onSubmitNewDestination}
            toggleModal={toggleModal}
          />
        )}
      </MainCard>
      {country !== "Not found" && (
        <Footer>
          <Duration title="Total duration" number={calculateTotalDuration()} type="day" />
          <DeleteButton
            onClick={() => toggleModal(country, "trip")}
            icon="trashCan"
            width="25px"
            height="25px"
            ariaLabel="Delete trip"
          />
        </Footer>
      )}
      {modal.visible && modal.type === "trip" && (
        <Modal name={`Delete ${modal.name}`} toggleModal={toggleModal}>
          <DeleteModal
            name={modal.name}
            onClick={async () => {
              await onDeleteTrip(id);
              router.push("/", null, { shallow: false });
            }}
          />
        </Modal>
      )}
      {modal.visible && modal.type === "destination" && (
        <Modal name={`Delete ${modal.name}`} toggleModal={toggleModal}>
          <DeleteModal
            name={modal.name}
            onClick={() => {
              onDeleteDestination(modal.id, id);
              toggleModal();
            }}
          />
        </Modal>
      )}
      {loader && <Loader />}
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
