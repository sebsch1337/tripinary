import dbConnect from "../lib/dbConnect";
import Destination from "../models/Destination";
import { deleteAllToDosByDestinationId } from "./toDoService";
import { getTripById } from "./tripService";

export async function getDestinationById(id, userEmail) {
  await dbConnect();

  const destination = await Destination.findOne({ _id: id });
  if (!destination) {
    const error = new Error("not found");
    error.status = 404;
    throw error;
  }

  const validateUser = await getTripById(destination.tripId, userEmail);
  if (!validateUser) {
    const error = new Error("unauthorized");
    error.status = 401;
    throw error;
  }

  const sanitizedDestination = {
    id: destination.id,
    name: destination.name,
    startDate: destination.startDate,
    endDate: destination.endDate,
    hotel: destination.hotel,
    transport: destination.transport,
    tripId: destination.tripId.toHexString(),
  };

  return sanitizedDestination;
}

export async function getDestinationsByTripId(id) {
  await dbConnect();

  const destinations = await Destination.find({ tripId: id });
  if (!Array.isArray(destinations)) throw new Error();

  const sanitizedDestinations = destinations.map((destination) => ({
    id: destination.id,
    name: destination.name,
    startDate: destination.startDate,
    endDate: destination.endDate,
    hotel: destination.hotel,
    transport: destination.transport,
    tripId: destination.tripId.toHexString(),
  }));

  return sanitizedDestinations;
}

export async function createDestination(body, tripId, userEmail) {
  const validatedTrip = await getTripById(tripId, userEmail);
  await dbConnect();

  const newDestination = await Destination.create({
    name: body.name,
    startDate: Math.floor(new Date().getTime() / 1000),
    endDate: Math.floor(new Date().getTime() / 1000),
    tripId: validatedTrip._id,
  });
  if (!newDestination) throw new Error();

  return newDestination;
}

export async function updateDestination(id, body) {
  await dbConnect();

  const destination = await Destination.findById(id);
  if (!destination) {
    const error = new Error("not found");
    error.status = 404;
    throw error;
  }

  if (body.startDate) destination.startDate = body.startDate;
  if (body.endDate) destination.endDate = body.endDate;
  destination.hotel = body.hotel;
  destination.transport = body.transport;

  const savedDestination = await destination.save();
  if (!savedDestination) throw new Error();

  return savedDestination;
}

export async function deleteDestination(id) {
  await dbConnect();
  const deletedDestination = await Destination.deleteOne({ _id: id });
  if (!deletedDestination.acknowledged) throw new Error();

  const deletedToDos = await deleteAllToDosByDestinationId(id);
  if (!deletedToDos.acknowledged) throw new Error();

  return deletedDestination;
}
