import { deleteDestination } from "../../../services/destinationService";

export default async function handler(req, res) {
  const {
    query: { id, tripId },
    method,
  } = req;

  switch (method) {
    case "GET":
      const destination = await getDestinationById(id);
      if (destination.error) return res.status(destination.status).json({ error: destination.error });
      res.status(200).json(destination);
      break;

    case "DELETE":
      const deletedDestination = await deleteDestination(id, tripId);
      if (deletedDestination.error)
        return res.status(deletedDestination.status).json({ error: deletedDestination.error });
      res.status(200).json(deletedDestination);
      break;

    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
}