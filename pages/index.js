import styled from "styled-components";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { getAllTrips } from "../services/tripService";

import TripList from "../components/Trip/TripList";
import Loader from "../components/Modals/Loader";
import LoginButton from "../components/Buttons/LoginButton";

import gitHubSvg from "../assets/github.svg";
import googleSvg from "../assets/google.svg";
import UserButton from "../components/Buttons/UserButton";
import UserProfile from "../components/Modals/UserProfile";
import Modal from "../components/Modals/Modal";
import DeleteModal from "../components/Modals/DeleteModal";

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);

  if (session) {
    const tripsDb = await getAllTrips(session.user.email);
    return { props: { tripsDb: tripsDb } };
  }

  return { props: {} };
}

export default function Home({ tripsDb }) {
  const { data: session } = useSession();
  const [trips, setTrips] = useState(tripsDb);
  const [loader, setLoader] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [modal, setModal] = useState({ visible: false, name: "" });

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

  const onSubmitNewTrip = async (event) => {
    event.preventDefault();
    const countryName = event.target.country.value;

    toggleLoader();
    const res = await fetch("/api/trips", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ country: countryName, userEmail: session.user.email }),
    });
    const newTrips = await res.json();
    toggleLoader();

    if (newTrips.error) return alert(newTrips.error);
    setTrips(newTrips);

    event.target.reset();
    setTimeout(() => {
      window.scrollBy({ top: 300, behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      {session ? (
        <>
          <Header>
            {!showProfile && session && <UserButton img={session.user.image} onClick={toggleShowProfile} />}
            <TripsHeadline>
              Start
              <br />
              your journey
            </TripsHeadline>
          </Header>

          <Main>
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
            <TripList trips={trips} onSubmitNewTrip={onSubmitNewTrip} />
          </Main>
        </>
      ) : (
        <LoginMain>
          <LoginHeadline>
            Login
            <br />
            to start your journey
          </LoginHeadline>
          <LoginButton
            icon={gitHubSvg}
            providerName="GitHub"
            bgColor="#24292e"
            onClick={() => {
              toggleLoader();
              signIn("github");
            }}
          />
          <LoginButton
            icon={googleSvg}
            providerName="Google"
            bgColor="#DB4437"
            onClick={() => {
              toggleLoader();
              signIn("google");
            }}
          />
        </LoginMain>
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

const Header = styled.header``;

const TripsHeadline = styled.h1`
  margin: 1.5em 1em 1em 0.8em;
  font-size: 2.5rem;
  font-weight: 500;
`;

const LoginHeadline = styled.h1`
  text-align: center;
`;

const LoginMain = styled.main`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1.5em;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;
`;
