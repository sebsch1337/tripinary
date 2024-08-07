import styled from "styled-components";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { getAllTrips } from "../services/tripService";

import Image from "next/image";
import logoSvg from "../assets/logo.svg";
import gitHubSvg from "../assets/github.svg";
import googleSvg from "../assets/google.svg";

import TripList from "../components/Trip/TripList";
import Loader from "../components/Modals/Loader";
import LoginButton from "../components/Buttons/LoginButton";

import UserButton from "../components/Buttons/UserButton";
import UserProfile from "../components/Modals/UserProfile";
import Modal from "../components/Modals/Modal";
import DeleteModal from "../components/Modals/DeleteModal";
import { getRandomPixabayImage } from "../services/pixabayService";

export async function getServerSideProps(context) {
	const session = await unstable_getServerSession(context.req, context.res, authOptions);
	if (!session) return { props: {} };

	const allTrips = await getAllTrips(session.user.email);
	const tripsDb = await Promise.all(
		allTrips.map(async (trip) => {
			try {
				const image = await getRandomPixabayImage(trip?.country);
				return { ...trip, image };
			} catch (error) {
				return { ...trip, image: { largeImageURL: "/public/not-found.webp" } };
			}
		})
	);
	return { props: { tripsDb } };
}

export default function Home({ tripsDb }) {
	const { data: session } = useSession();
	const [trips, setTrips] = useState(tripsDb);
	const [showProfile, setShowProfile] = useState(false);
	const [modal, setModal] = useState({ visible: false, name: "" });
	const [loader, setLoader] = useState({ triggered: false, show: false });

	useEffect(() => {
		const timer = setTimeout(() => {
			if (loader.triggered) {
				setLoader((loader) => ({ triggered: false, show: !loader.show }));
			}
		}, 200);
		return () => clearTimeout(timer);
	}, [loader.triggered]);

	const toggleLoader = () => setLoader((loader) => ({ triggered: !loader.triggered, show: loader.show }));

	const toggleShowProfile = () => setShowProfile((showProfile) => !showProfile);

	const toggleModal = (modalName = "", type = "") =>
		setModal((modal) => ({ visible: !modal.visible, name: modalName, type: type }));

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
		if (newTrips.message) return alert(newTrips.message);
		addImagesToTrips(newTrips);

		event.target.reset();
		setTimeout(() => {
			window.scrollBy({ top: 300, behavior: "smooth" });
		}, 100);
	};

	const onDeleteAccount = async () => {
		const res = await fetch("/api/trips", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({}),
		});

		const deletedAccount = await res.json();
		if (deletedAccount.error) return alert(deletedAccount.error);
	};

	const addImagesToTrips = async (newTrips) => {
		const tripsWithImages = await Promise.all(
			await newTrips.map(async (trip) => {
				const res = await fetch(`/api/images?q=${trip?.country}`);
				const image = await res.json();
				return { ...trip, image };
			})
		);

		setTrips(tripsWithImages);
	};

	return (
		<>
			{session ? (
				<>
					<Header>
						{!showProfile && session && (
							<UserButton
								img={session.user.image}
								onClick={toggleShowProfile}
							/>
						)}
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
						<TripList
							trips={trips}
							onSubmitNewTrip={onSubmitNewTrip}
							loader={loader}
						/>
					</Main>
				</>
			) : (
				<LoginMain>
					<LogoArea>
						<Image
							src={logoSvg}
							width="150"
							height="150"
							alt="logo"
						/>
						<LogoText>TRIPINARY</LogoText>
					</LogoArea>

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
				<Modal
					name={`Delete ${modal.name}`}
					toggleModal={toggleModal}
				>
					<DeleteModal
						name={modal.name}
						onClick={async () => {
							toggleLoader();
							toggleModal();
							toggleShowProfile();
							await onDeleteAccount();
							signOut();
						}}
					/>
				</Modal>
			)}
			{loader.show && <Loader />}
		</>
	);
}

const Header = styled.header``;

const TripsHeadline = styled.h1`
	margin: 1.5em 1em 1em 0.8em;
	font-size: 2.5rem;
	font-weight: 500;
`;

const LogoArea = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	flex-wrap: wrap;
`;

const LogoText = styled.h1`
	color: #316bff;
	text-align: center;
	font-size: 2.5rem;
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
