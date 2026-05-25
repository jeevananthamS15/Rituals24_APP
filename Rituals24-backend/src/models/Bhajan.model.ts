import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BhajanSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    enum: ["Devotional", "Festival", "Traditional", "Custom"],
  },
  languages: [{ type: String }],
  durationRange: {
    type: String,
  },
  rating: {
    type: Number,
  },
  significance: [{ type: String }],
  images: [{ type: String }],
  enabled: {
    type: Boolean,
    default: true,
  },
});

export const Bhajan = mongoose.model("Bhajan", BhajanSchema);
