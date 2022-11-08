import mongoose from "mongoose";
const { Schema } = mongoose;

const destinationSchema = new Schema({
  name: { type: String, required: true },
  startDate: { type: Number },
  endDate: { type: Number },
  hotel: { type: String, default: "" },
  transport: { type: String, default: "" },
  tripId: { type: String },
});

const Destination =
  mongoose.models.Destination || mongoose.model("Destination", destinationSchema, "destinations");

export default Destination;
