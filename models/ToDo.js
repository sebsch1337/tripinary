import mongoose from "mongoose";

const { Schema } = mongoose;

const toDoSchema = new Schema({
  description: { type: String, required: true },
  checked: { type: Boolean, default: false },
  destinationId: { type: String, required: true },
});

const ToDo = mongoose.models.ToDo || mongoose.model("ToDo", toDoSchema, "todos");

export default ToDo;
