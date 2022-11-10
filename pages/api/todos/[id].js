import { deleteToDo, getToDosByDestinationId, updateToDo } from "../../../services/toDoService";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "unauthorized" });

  const {
    query: { id, destinationId },
    method,
  } = req;

  switch (method) {
    case "PATCH":
      try {
        await updateToDo(id, req.body);
        const newToDos = await getToDosByDestinationId(destinationId, session.user.email);
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
        const newToDos = await getToDosByDestinationId(destinationId, session.user.email);
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
