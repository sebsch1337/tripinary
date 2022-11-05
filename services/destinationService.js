import { validateId } from "../helpers/validate";
import dbConnect from "../lib/dbConnect";
import Destination from "../models/Destination";

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
  await dbConnect();

  const newDestination = await Destination.create({
    name: body.name,
    startDate: Math.floor(new Date().getTime() / 1000),
    endDate: Math.floor(new Date().getTime() / 1000),
    tripId: tripId,
  });

  return await getDestinationsByTripId(tripId);
}

export async function deleteDestination(id, tripId) {
  if (!validateId(id)) return { status: 400, error: "Invalid id" };

  await dbConnect();
  const deletedDestination = await Destination.deleteOne({ _id: id });
  return await getDestinationsByTripId(tripId);
}
