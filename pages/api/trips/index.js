import { getAllTrips, postTrip } from "../../../services/tripService";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const trips = await getAllTrips();
        res.status(200).json(trips);
      } catch (err) {
        res.status(404).json({ error: "Not found" });
      }
      break;

    case "POST":
      try {
        const newTrip = await postTrip(req.body);
        if (!newTrip) return res.status(400).json({ error: "Invalid name" });
        const trips = await getAllTrips();
        res.status(201).json(trips);
      } catch (err) {
        res.status(400).json({ error: `Couldn't create trip` });
      }
      break;

    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
}
