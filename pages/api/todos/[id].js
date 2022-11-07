import { deleteToDo, getToDoById, updateToDo } from "../../../services/toDoService";

export default async function handler(req, res) {
  const {
    query: { id, destinationId },
    method,
  } = req;

  switch (method) {
    case "GET":
      const toDo = await getToDoById(id);
      if (toDo.error) return res.status(toDo.status).json({ error: toDo.error });
      res.status(200).json(toDo);
      break;

    case "PATCH":
      const newToDos = await updateToDo(id, req.body);
      if (newToDos.error) return res.status(newToDos.status).json({ error: newToDos.error });
      res.status(201).json(newToDos);
      break;

    case "DELETE":
      const deletedToDo = await deleteToDo(id, destinationId);
      if (deletedToDo.error) return res.status(deletedToDo.status).json({ error: deletedToDo.error });
      res.status(200).json(deletedToDo);
      break;

    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
}
