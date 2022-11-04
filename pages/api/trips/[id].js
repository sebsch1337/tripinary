import dbConnect from "../../../lib/dbConnect";
import Trip from "../../../models/Trip";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const trip = await Trip.findById(id);
        res.status(200).json(trip);
      } catch (err) {
        res.status(404).json({ error: "Not found" });
      }
      break;

    case "PATCH":
      try {
        const updateTrip = await Trip.findByIdAndUpdate(id, { country: req.body });
        res.status(200).json(updateTrip);
      } catch (err) {
        res.status(404).json({ error: "Not found" });
      }
      break;

    case "DELETE":
      try {
        const deleteTrip = await Trip.deleteOne({ _id: id });
        if (deleteTrip.deletedCount === 0) return res.status(404).json({ error: "Not found" });

        res.status(200).json(deleteTrip.deletedCount);
      } catch (err) {
        res.status(400).json({ error: err });
      }
      break;

    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
}
