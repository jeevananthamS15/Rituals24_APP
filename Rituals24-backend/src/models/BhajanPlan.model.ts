import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BhajanPlanSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  duration: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  artist_count: {
    type: Number,
  },
  instruments: [{ type: String }],
  features: [{ type: String }],
  tag: {
    type: String,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
});

export const BhajanPlan = mongoose.model("BhajanPlan", BhajanPlanSchema);
