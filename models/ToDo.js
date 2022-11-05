import mongoose from "mongoose";
import Destination from "./Destination";
const { Schema } = mongoose;

const toDoSchema = new Schema({
  description: { type: String, required: true },
  checked: { type: Boolean, required: true },
  destinationId: Destination._id,
});

const ToDo = mongoose.models.Destination || mongoose.model("ToDo", toDoSchema, "todos");

export default ToDo;
