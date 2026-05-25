import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TempleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  state: {
    type: String,
  },
  language: {
    type: String,
  },
  diety: {
    type: String,
  },
  rating: {
    type: Number,
  },
  special_poojas: [
    {
      name: {
        type: String,
      },
      description: {
        type: String,
      },
      price: {
        type: Number,
      },
      duration: {
        type: Number,
      },
      timing: {
        type: String,
      },
    },
  ],
  images: [
    {
      type: String,
    },
  ],
  verified: {
    type: Boolean,
    default: false,
  },
  certified_pandits_available: {
    type: Boolean,
    default: false,
  },
  featured_on_homepage: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
});

export default mongoose.model("Temple", TempleSchema);
