import dbConnect from "../lib/dbConnect";
import Trip from "../models/Trip";

export async function getAllTrips() {
  await dbConnect();

  const trips = await Trip.find();
  const sanitizedTrips = trips.map((trip) => ({
    id: trip.id,
    country: trip.country,
  }));

  return sanitizedTrips;
}

export async function postTrip(body) {
  await dbConnect();

  const cleanedBody = body.trim();
  if (cleanedBody === "" || !cleanedBody.match("^[a-zA-ZäÄöÖüÜß ]*$")) return false;

  return Trip.create({ country: cleanedBody });
}
