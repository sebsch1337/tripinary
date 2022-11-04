import dbConnect from "../lib/dbConnect";
import Trip from "../models/Trip";

const validateId = (id) => id.match("^[0-9a-fA-F]{24}$");

export async function getAllTrips() {
  await dbConnect();
  const trips = await Trip.find();

  const sanitizedTrips = trips.map((trip) => ({
    id: trip.id,
    country: trip.country,
  }));

  return sanitizedTrips;
}

export async function getTripById(id) {
  if (!validateId(id)) return false;

  await dbConnect();
  const trip = await Trip.findById(id);
  const sanitizedTrip = trip?.country ? trip.country : "Not found";

  return sanitizedTrip;
}

export async function postTrip(body) {
  const cleanedBody = body.trim();
  if (cleanedBody === "" || !cleanedBody.match("^[a-zA-ZäÄöÖüÜß ]*$")) return false;

  await dbConnect();
  return Trip.create({ country: cleanedBody });
}

export async function deleteTrip(id) {
  if (!validateId(id)) return false;

  await dbConnect();
  const deleteTrip = await Trip.deleteOne({ _id: id });
  if (deleteTrip.deletedCount === 0) return false;
  return deleteTrip;
}
