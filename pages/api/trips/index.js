import { getAllTrips, postTrip } from "../../../services/tripService";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "unauthorized" });

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const trips = await getAllTrips(session.user.email);
        res.status(200).json(trips);
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
        await postTrip(req.body);
        const newTrips = await getAllTrips(session.user.email);
        res.status(201).json(newTrips);
      } catch (error) {
        if (error.status) {
          return res.status(error.status).json({ message: error.message });
        }
        console.error(error.message);
        return res.status(500).json({ message: "internal server error" });
      }
      break;

    default:
      res.status(405).json({ error: "method not allowed" });
      break;
  }
}
