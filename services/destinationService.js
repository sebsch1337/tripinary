import { validateId } from "../helpers/validate";
import dbConnect from "../lib/dbConnect";
import Destination from "../models/Destination";
import { deleteAllToDosByDestinationId } from "./toDoService";

export async function getAllDestinations() {
  await dbConnect();

  const destinations = await Destination.find();
  const sanitizedDestinations = destinations.map((destination) => ({
    id: destination.id,
    name: destination.name,
    startDate: destination.startDate,
    endDate: destination.endDate,
    hotel: destination.hotel,
    transport: destination.transport,
    tripId: destination.tripId,
  }));

  return sanitizedDestinations;
}

export async function getDestinationById(id) {
  await dbConnect();

  const destination = await Destination.findOne({ _id: id });
  const sanitizedDestination = {
    id: destination.id,
    name: destination.name,
    startDate: destination.startDate,
    endDate: destination.endDate,
    hotel: destination.hotel,
    transport: destination.transport,
    tripId: destination.tripId,
  };

  return sanitizedDestination;
}

export async function getDestinationsByTripId(id) {
  await dbConnect();
  const destinations = await Destination.find({ tripId: id });
  if (!Array.isArray(destinations)) return { status: 500, error: "Internal server error" };

  const sanitizedDestinations = destinations.map((destination) => ({
    id: destination.id,
    name: destination.name,
    startDate: destination.startDate,
    endDate: destination.endDate,
    hotel: destination.hotel,
    transport: destination.transport,
    tripId: destination.tripId,
  }));

  return sanitizedDestinations;
}

export async function createDestination(body, tripId) {
  if (!validateId(tripId)) return { status: 400, error: "Invalid tripId" };
  await dbConnect();

  const newDestination = await Destination.create({
    name: body.name,
    startDate: Math.floor(new Date().getTime() / 1000),
    endDate: Math.floor(new Date().getTime() / 1000),
    tripId: tripId,
  });

  return await getDestinationsByTripId(tripId);
}

export async function updateDestination(id, body) {
  if (!validateId(id)) return { status: 400, error: "Invalid id" };

  await dbConnect();
  const destination = await Destination.findById(id);
  if (!destination) return { status: 404, error: id + " not found" };

  if (body.startDate) destination.startDate = body.startDate;
  if (body.endDate) destination.endDate = body.endDate;
  destination.hotel = body.hotel;
  destination.transport = body.transport;

  const savedDestination = await destination.save();
  if (!savedDestination) return { status: 500, error: "Internal server error" };
  return await getDestinationById(id);
}

export async function deleteDestination(id, tripId) {
  if (!validateId(id)) return { status: 400, error: "Invalid id" };
  if (!validateId(tripId)) return { status: 400, error: "Invalid tripId" };

  await dbConnect();
  const deletedDestination = await Destination.deleteOne({ _id: id });
  if (!deletedDestination.acknowledged) return { status: 500, error: "Internal server error" };
  const deletedToDos = await deleteAllToDosByDestinationId(id);
  if (!deletedToDos.acknowledged) return { status: 500, error: "Internal server error" };
  return await getDestinationsByTripId(tripId);
}
