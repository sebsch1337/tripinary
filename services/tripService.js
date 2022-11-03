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
