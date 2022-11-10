import { createToDo, getToDosByDestinationId } from "../../../services/toDoService";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "unauthorized" });

  const {
    query: { destinationId },
    method,
  } = req;

  switch (method) {
    case "POST":
      try {
        await createToDo(req.body, destinationId, session.user.email);
        const newToDos = await getToDosByDestinationId(destinationId, session.user.email);
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
