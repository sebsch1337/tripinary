import { createToDo } from "../../../services/toDoService";

export default async function handler(req, res) {
  const {
    query: { destinationId },
    method,
  } = req;

  switch (method) {
    case "POST":
      try {
        const newToDos = await createToDo(req.body, destinationId);
        res.status(201).json(newToDos);
      } catch (error) {
        if (error.status) {
          return res.status(error.status).json({ message: error.message });
        }
        console.error(error.message);
        return res.status(500).json({ message: "internal server error" });
      }
      break;

    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
}
