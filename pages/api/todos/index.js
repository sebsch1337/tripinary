import { createToDo, getAllToDos, getToDosByDestinationId } from "../../../services/toDoService";

export default async function handler(req, res) {
  const {
    query: { destinationId },
    method,
  } = req;

  switch (method) {
    case "POST":
      const newToDos = await createToDo(req.body, destinationId);
      if (newToDos.error) return res.status(newToDos.status).json({ error: newToDos.error });
      res.status(201).json(newToDos);
      break;

    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
}
