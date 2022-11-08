import mongoose from "mongoose";

const { Schema } = mongoose;

const tripSchema = new Schema({
  country: { type: String, required: true },
});

const Trip = mongoose.models.Trip || mongoose.model("Trip", tripSchema, "trips");

export default Trip;
