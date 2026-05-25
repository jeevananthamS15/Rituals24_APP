import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PujaSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
  },
  language: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  service_type: {
    type: String,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  panditCount: {
    type: Number,
  },
  rating: {
    type: Number,
  },
  isPopular: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: true,
  },
});

export const Puja = mongoose.model("Puja", PujaSchema);
