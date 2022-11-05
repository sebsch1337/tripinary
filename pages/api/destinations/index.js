import { getDestinationsByTripId, createDestination } from "../../../services/destinationService";

export default async function handler(req, res) {
  const {
    query: { tripId },
    method,
  } = req;

  switch (method) {
    case "GET":
      const destinations = await getDestinationsByTripId(tripId);
      if (destinations.error) return res.status(destinations.status).json({ error: destinations.error });
      res.status(200).json(destinations);
      break;

    case "POST":
      const newDestinations = await createDestination(req.body, tripId);
      if (newDestinations.error)
        return res.status(newDestinations.status).json({ error: newDestinations.error });
      res.status(201).json(newDestinations);
      break;

    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
}
