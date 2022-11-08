import { deleteToDo, getToDosByDestinationId, updateToDo } from "../../../services/toDoService";

export default async function handler(req, res) {
  const {
    query: { id, destinationId },
    method,
  } = req;

  switch (method) {
    case "PATCH":
      try {
        const newToDos = await updateToDo(id, req.body);
        res.status(200).json(newToDos);
      } catch (error) {
        if (error.status) {
          return res.status(error.status).json({ message: error.message });
        }
        console.error(error.message);
        return res.status(500).json({ message: "internal server error" });
      }
      break;

    case "DELETE":
      try {
        await deleteToDo(id);
        const newToDos = await getToDosByDestinationId(destinationId);
        res.status(200).json(newToDos);
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
