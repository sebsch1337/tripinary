import { getDestinationsByTripId, createDestination } from "../../../services/destinationService";

export default async function handler(req, res) {
  const {
    query: { tripId },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const destinations = await getDestinationsByTripId(tripId);
        res.status(200).json(destinations);
      } catch (error) {
        if (error.status) {
          return res.status(error.status).json({ message: error.message });
        }
        console.error(error.message);
        return res.status(500).json({ message: "internal server error" });
      }
      break;

    case "POST":
      try {
        const newDestinations = await createDestination(req.body, tripId);
        res.status(201).json(newDestinations);
      } catch (error) {
        if (error.status) {
          return res.status(error.status).json({ message: error.message });
        }
        console.error(error.message);
        return res.status(500).json({ message: "internal server error" });
      }
      break;

    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
}
