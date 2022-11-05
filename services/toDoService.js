import dbConnect from "../lib/dbConnect";
import ToDo from "../models/ToDo";

export async function getAllToDos() {
  await dbConnect();

  const toDos = await ToDo.find();
  const sanitizedToDos = toDos.map((toDo) => ({
    id: toDo.id,
    description: toDo.description,
    checked: toDo.checked,
    destinationId: toDo.destinationId,
  }));

  return sanitizedToDos;
}
