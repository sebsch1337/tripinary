import {
  deleteDestination,
  getDestinationById,
  getDestinationsByTripId,
  updateDestination,
} from "../../../services/destinationService";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "unauthorized" });

  const {
    query: { id, tripId },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const destination = await getDestinationById(id);
        res.status(200).json(destination);
      } catch (error) {
        if (error.status) {
          return res.status(error.status).json({ message: error.message });
        }
        console.error(error.message);
        return res.status(500).json({ message: "internal server error" });
      }
      break;

    case "PATCH":
      try {
        await updateDestination(id, req.body);
        const newDestination = await getDestinationById(id, session.user.email);
        res.status(200).json(newDestination);
      } catch (error) {
        if (error.status) {
          return res.status(error.status).json({ message: error.message });
        }
        console.error(error.message);
        return res.status(500).json({ message: "internal server error" });
      }
      break;

    case "DELETE":
      try {
        await deleteDestination(id, tripId);
        const newDestinations = await getDestinationsByTripId(tripId);
        res.status(200).json(newDestinations);
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
