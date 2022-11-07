import { validateId, validateTripName } from "../helpers/validate";
import dbConnect from "../lib/dbConnect";
import Trip from "../models/Trip";
import { deleteDestination, getDestinationsByTripId } from "./destinationService";

export async function getAllTrips() {
  await dbConnect();
  const trips = await Trip.find();
  if (!Array.isArray(trips)) return { status: 500, error: "Internal server error" };

  const sanitizedTrips = trips.map((trip) => ({
    id: trip.id,
    country: trip.country,
  }));

  return sanitizedTrips;
}

export async function getTripById(id) {
  if (!validateId(id)) return { status: 400, error: "Invalid id" };

  await dbConnect();
  const trip = await Trip.findById(id);
  return trip?.country ? trip.country : { status: 404, error: `${id} not found` };
}

export async function postTrip(body) {
  const cleanedBody = body.trim();
  if (!validateTripName(cleanedBody)) return { status: 400, error: "Invalid name" };

  await dbConnect();
  const newTrip = await Trip.create({ country: cleanedBody });
  if (!newTrip._id) return { status: 500, error: "Internal server error" };
  return await getAllTrips();
}

export async function deleteTrip(id) {
  if (!validateId(id)) return { status: 400, error: "Invalid id" };

  await dbConnect();
  const allDestinations = await getDestinationsByTripId(id);
  allDestinations.map((destination) => deleteDestination(destination.id, id));

  const deletedTrip = await Trip.deleteOne({ _id: id });
  if (!deletedTrip.acknowledged) return { status: 404, error: `${id} not found` };
  return deletedTrip;
}
