import { validateId } from "../helpers/validate";
import dbConnect from "../lib/dbConnect";
import ToDo from "../models/ToDo";

export async function getToDoById(id) {
  if (!validateId(id)) return { status: 400, error: "Invalid id" };
  await dbConnect();

  const toDo = await ToDo.findById(id);
  if (!toDo) return { status: 404, error: id + " not found" };
  const sanitizedToDo = {
    id: toDo.id,
    description: toDo.description,
    checked: toDo.checked,
    destinationId: toDo.destinationId,
  };

  return sanitizedToDo;
}

export async function getAllToDos() {
  await dbConnect();

  const toDos = await ToDo.find();
  if (!Array.isArray(toDos)) return { status: 500, error: "Internal server error" };
  const sanitizedToDos = toDos.map((toDo) => ({
    id: toDo.id,
    description: toDo.description,
    checked: toDo.checked,
    destinationId: toDo.destinationId,
  }));

  return sanitizedToDos;
}

export async function getToDosByDestinationId(destinationId) {
  if (!validateId(destinationId)) return { status: 400, error: "Invalid destinationId" };
  await dbConnect();

  const toDos = await ToDo.find({ destinationId: destinationId });
  if (!Array.isArray(toDos)) return { status: 500, error: "Internal server error" };
  const sanitizedToDos = toDos.map((toDo) => ({
    id: toDo.id,
    description: toDo.description,
    checked: toDo.checked,
    destinationId: toDo.destinationId,
  }));

  return sanitizedToDos;
}

export async function createToDo(body, destinationId) {
  if (!validateId(destinationId)) return { status: 400, error: "Invalid destinationId" };
  await dbConnect();

  const newToDo = await ToDo.create({
    description: body.description,
    destinationId: destinationId,
  });

  return await getToDosByDestinationId(destinationId);
}

export async function updateToDo(id, body) {
  if (!validateId(id)) return { status: 400, error: "Invalid id" };

  await dbConnect();
  const toDo = await ToDo.findById(id);
  if (!toDo) return { status: 404, error: id + " not found" };
  if (body.description) toDo.description = body.description;
  toDo.checked = body.checked;
  const savedToDo = await toDo.save();
  if (!savedToDo) return { status: 500, error: "Internal server error" };
  return await getToDosByDestinationId(toDo.destinationId);
}

export async function deleteToDo(id, destinationId) {
  if (!validateId(id)) return { status: 400, error: "Invalid id" };
  if (!validateId(destinationId)) return { status: 400, error: "Invalid destinationId" };

  await dbConnect();
  const deletedToDo = await ToDo.deleteOne({ _id: id });
  return await getToDosByDestinationId(destinationId);
}

export async function deleteAllToDosByDestinationId(destinationId) {
  if (!validateId(destinationId)) return { status: 400, error: "Invalid destinationId" };
  await dbConnect();
  return await ToDo.deleteMany({ destinationId: destinationId });
}
