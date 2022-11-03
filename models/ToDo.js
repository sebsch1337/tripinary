import mongoose from "mongoose";
const { Schema } = mongoose;

const toDoSchema = new Schema({
  description: { type: String, required: true },
  checked: { type: Boolean, required: true },
});

const ToDo = mongoose.models.Destination || mongoose.model("ToDo", toDoSchema, "todos");

export default ToDo;
