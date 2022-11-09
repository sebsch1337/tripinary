import { getDestinationsByTripId, createDestination } from "../../../services/destinationService";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "unauthorized" });

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
        await createDestination(req.body, tripId, session.user.email);
        const newDestinations = await getDestinationsByTripId(tripId);
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
