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
