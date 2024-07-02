import styled from "styled-components";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import { useState, useEffect } from "react";

import Header from "../../components/Header";
import Main from "../../components/Main";
import Footer from "../../components/Footer";
import Loader from "../../components/Modals/Loader";
import Modal from "../../components/Modals/Modal";
import EditDatesForm from "../../components/Edit/EditDatesForm";
import EditTextForm from "../../components/Edit/EditTextForm";
import EditButton from "../../components/Buttons/EditButton";
import ToDoItem from "../../components/ToDo/ToDoItem";
import ToDoForm from "../../components/ToDo/ToDoForm";
import Duration from "../../components/Duration";

import { getToDosByDestinationId } from "../../services/toDoService";
import { getDestinationById } from "../../services/destinationService";
import { getRandomPixabayImage } from "../../services/pixabayService";

export async function getServerSideProps(context) {
	const session = await unstable_getServerSession(context.req, context.res, authOptions);

	if (!session) {
		return { redirect: { destination: "/", permanent: false } };
	}

	const id = context.params.id;

	const [destinationDB, toDosDB] = await Promise.all([
		await getDestinationById(id, session.user.email),
		await getToDosByDestinationId(id, session.user.email),
	]);
	const destinationImage = await getRandomPixabayImage(destinationDB.name);

	const formattedStartDate = new Date(destinationDB.startDate * 1000).toLocaleDateString();
	const formattedEndDate = new Date(destinationDB.endDate * 1000).toLocaleDateString();

	return {
		props: {
			id: id,
			destinationDB,
			toDosDB,
			destinationImage,
			formattedStartDate,
			formattedEndDate,
		},
	};
}

export default function Details({ id, destinationDB, toDosDB, destinationImage, formattedStartDate, formattedEndDate }) {
	const [destination, setDestination] = useState(destinationDB);
	const [toDos, setToDos] = useState(toDosDB);
	const [modal, setModal] = useState({ visible: false, name: "" });
	const [loader, setLoader] = useState({ triggered: false, show: false });

	const destinationName = destinationDB ? destinationDB.name : "Not found";

	const calculateDuration = () => (destination?.endDate - destination?.startDate) / 86400;

	useEffect(() => {
		const timer = setTimeout(() => {
			if (loader.triggered) {
				setLoader((loader) => ({ triggered: false, show: !loader.show }));
			}
		}, 200);
		return () => clearTimeout(timer);
	}, [loader.triggered]);

	const toggleLoader = () => setLoader((loader) => ({ triggered: !loader.triggered, show: loader.show }));

	const toggleModal = (modalName = "", type = "") =>
		setModal((modal) => ({ visible: !modal.visible, name: modalName, type: type }));

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

	const onDeleteToDoItem = async (id, destinationId) => {
		toggleLoader();
		const res = await fetch("/api/todos/" + id + "?destinationId=" + destinationId, {
			method: "DELETE",
		});
		const newToDos = await res.json();
		setToDos(newToDos);
		toggleLoader();
	};

	return (
		<>
			<Header coverImage={destinationImage} />
			<Main>
				<DetailHeadline>{destinationName.toUpperCase()}</DetailHeadline>
				{destination && (
					<DetailSection>
						<DetailTitle>
							Dates
							<EditButton toggleModal={() => toggleModal("Dates")} />
						</DetailTitle>
						<DetailText>
							{/* {new Date(destination.startDate * 1000).toLocaleDateString() +
								` until ` +
								new Date(destination.endDate * 1000).toLocaleDateString()} */}
							{`${formattedStartDate} until ${formattedEndDate}`}
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
						<DetailText>{destination.transport === "" ? "<No transportation booked yet>" : destination.transport}</DetailText>
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
			</Main>
			<Footer>
				<Duration
					title="Duration"
					number={calculateDuration()}
					type="night"
				/>
			</Footer>
			{modal.visible && (
				<Modal
					name={modal.name}
					toggleModal={toggleModal}
				>
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
			{loader.show && <Loader />}
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

const DetailHeadline = styled.h1`
	margin: 2rem 0 1rem;
	text-align: center;
`;
