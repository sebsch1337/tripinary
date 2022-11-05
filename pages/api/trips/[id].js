import dbConnect from "../../../lib/dbConnect";
import { getTripById, deleteTrip } from "../../../services/tripService";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      const trip = await getTripById(id);
      if (trip.error) return res.status(trip.status).json({ error: trip.error });
      res.status(200).json(trip);
      break;

    case "DELETE":
      const deletedTrip = await deleteTrip(id);
      if (deletedTrip.error) return res.status(deletedTrip.status).json({ error: deletedTrip.error });
      res.status(200).json(deletedTrip);
      break;

    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
}
