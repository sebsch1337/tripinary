import mongoose from "mongoose";
const { Schema } = mongoose;

const destinationSchema = new Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  hotel: { type: String, required: true },
  transport: { type: String, required: true },
  _tripId: { type: String, required: true },
  toDos: { type: Array, required: true },
});

const Destination =
  mongoose.models.Destination || mongoose.model("Destination", destinationSchema, "destinations");

export default Destination;
