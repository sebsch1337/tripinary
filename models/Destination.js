import mongoose from "mongoose";
import Trip from "./Trip";
const { Schema } = mongoose;

const destinationSchema = new Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  hotel: { type: String, required: true },
  transport: { type: String, required: true },
  tripId: Trip._id,
});

const Destination =
  mongoose.models.Destination || mongoose.model("Destination", destinationSchema, "destinations");

export default Destination;
