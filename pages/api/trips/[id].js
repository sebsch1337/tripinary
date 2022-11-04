import dbConnect from "../../../lib/dbConnect";
import Trip from "../../../models/Trip";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  if (id.length !== 24 || !id.match("^[a-z0-9]*$")) return res.status(400).json({ error: "Wrong id" });

  switch (method) {
    case "GET":
      try {
        const trip = await Trip.findById(id);
        if (!trip) return res.status(404).json({ error: id + " not found" });
        res.status(200).json(trip);
      } catch (err) {
        res.status(404).json({ error: id + " not found" });
      }
      break;

    case "DELETE":
      try {
        const deleteTrip = await Trip.deleteOne({ _id: id });
        if (deleteTrip.deletedCount === 0) return res.status(404).json({ error: "Not found" });
        res.status(200).json();
      } catch (err) {
        res.status(400).json({ error: err });
      }
      break;

    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
}
