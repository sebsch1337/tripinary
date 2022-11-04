import dbConnect from "../../../lib/dbConnect";
import Trip from "../../../models/Trip";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const trips = await Trip.find();
        res.status(200).json(trips);
      } catch (err) {
        res.status(404).json({ error: "Not found" });
      }
      break;

    case "POST":
      try {
        const newTrip = await Trip.create({ country: req.body });
        res.status(201).json(newTrip);
      } catch (err) {
        res.status(400).json({ error: err });
      }
      break;

    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
}
