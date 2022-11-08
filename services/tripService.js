import { validateTripName } from "../helpers/validate";
import dbConnect from "../lib/dbConnect";
import Trip from "../models/Trip";
import { deleteDestination, getDestinationsByTripId } from "./destinationService";

export async function getAllTrips() {
  await dbConnect();

  const trips = await Trip.find();
  if (!Array.isArray(trips)) throw new Error();

  const sanitizedTrips = trips.map((trip) => ({
    id: trip.id,
    country: trip.country,
  }));

  return sanitizedTrips;
}

export async function getTripById(id) {
  await dbConnect();

  const trip = await Trip.findById(id);
  if (!trip) {
    const error = new Error("not found");
    error.status = 404;
    throw error;
  }

  return trip;
}

export async function postTrip(body) {
  const cleanedBody = body.trim();
  if (!validateTripName(cleanedBody)) {
    const error = new Error("invalid name");
    error.status = 400;
    throw error;
  }

  await dbConnect();

  const newTrip = await Trip.create({ country: cleanedBody });
  if (!newTrip) throw new Error();

  return newTrip;
}

export async function deleteTrip(id) {
  await dbConnect();

  const allDestinations = await getDestinationsByTripId(id);
  if (!allDestinations) throw new Error();
  allDestinations.map((destination) => deleteDestination(destination.id, id));

  const deletedTrip = await Trip.deleteOne({ _id: id });
  if (!deletedTrip.acknowledged) throw new Error();

  return deletedTrip;
}
