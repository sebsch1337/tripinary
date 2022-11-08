import dbConnect from "../lib/dbConnect";
import ToDo from "../models/ToDo";
import { getDestinationById } from "./destinationService";

export async function getAllToDos() {
  await dbConnect();

  const toDos = await ToDo.find();
  if (!Array.isArray(toDos)) throw new Error();

  const sanitizedToDos = toDos.map((toDo) => ({
    id: toDo.id,
    description: toDo.description,
    checked: toDo.checked,
    destinationId: toDo.destinationId,
  }));

  return sanitizedToDos;
}

export async function getToDosByDestinationId(destinationId) {
  await dbConnect();
  const toDos = await ToDo.find({ destinationId: destinationId });
  if (!Array.isArray(toDos)) throw new Error();

  const sanitizedToDos = toDos.map((toDo) => ({
    id: toDo.id,
    description: toDo.description,
    checked: toDo.checked,
    destinationId: toDo.destinationId,
  }));

  return sanitizedToDos;
}

export async function createToDo(body, destinationId) {
  const validatedDestination = await getDestinationById(destinationId);

  await dbConnect();
  const newToDo = await ToDo.create({
    description: body.description,
    destinationId: validatedDestination.id,
  });
  if (!newToDo) throw new Error();

  return await getToDosByDestinationId(destinationId);
}

export async function updateToDo(id, body) {
  await dbConnect();
  const toDo = await ToDo.findById(id);
  if (!toDo) {
    const error = new Error("not found");
    error.status = 404;
    throw error;
  }
  if (body.description) toDo.description = body.description;
  toDo.checked = body.checked;
  const savedToDo = await toDo.save();
  if (!savedToDo) throw new Error();
  return await getToDosByDestinationId(toDo.destinationId);
}

export async function deleteToDo(id) {
  await dbConnect();
  const deleted = await ToDo.deleteOne({ _id: id });
  if (!deleted.acknowledged) throw new Error();
  return deleted;
}

export async function deleteAllToDosByDestinationId(destinationId) {
  await dbConnect();
  const deleted = await ToDo.deleteMany({ destinationId: destinationId });
  if (!deleted.acknowledged) throw new Error();
  return deleted;
}
