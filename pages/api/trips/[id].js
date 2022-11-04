import dbConnect from "../../../lib/dbConnect";
import Trip from "../../../models/Trip";
import { getTripById, deleteTrip } from "../../../services/tripService";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  if (!id.match("^[0-9a-fA-F]{24}$")) return res.status(400).json({ error: "Wrong id" });

  switch (method) {
    case "GET":
      try {
        const trip = await getTripById(id);
        if (!trip) return res.status(404).json({ error: id + " not found" });
        res.status(200).json(trip);
      } catch (err) {
        res.status(404).json({ error: id + " not found" });
      }
      break;

    case "DELETE":
      try {
        const deletedTrip = await deleteTrip(id);
        if (!deletedTrip) return res.status(404).json({ error: id + " not found" });
        res.status(200).json(deletedTrip);
      } catch (err) {
        res.status(400).json({ error: err });
      }
      break;

    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
}
