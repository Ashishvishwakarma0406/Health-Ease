import mongoose from "mongoose";

const ambulanceRequestSchema = new mongoose.Schema({
  latitude: {type: Number, required: false},
  longitude: {type: Number, required: false},
  manualLocation: {type: String, required: false},
  requestedAt: {type: Date, default: Date.now},
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: false},
  status: {type: String, enum: ["pending", "dispatched", "completed", "canceled"], default: "pending"},
});

const AmbulanceRequest = mongoose.model("AmbulanceRequest", ambulanceRequestSchema);

export default AmbulanceRequest;
