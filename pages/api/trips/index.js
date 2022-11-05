import { getAllTrips, postTrip } from "../../../services/tripService";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      const trips = await getAllTrips();
      if (trips.error) return res.status(trips.status).json({ error: trips.error });
      res.status(200).json(trips);
      break;

    case "POST":
      const newTrips = await postTrip(req.body);
      if (newTrips.error) return res.status(newTrips.status).json({ error: newTrips.error });
      res.status(201).json(newTrips);
      break;

    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
}
