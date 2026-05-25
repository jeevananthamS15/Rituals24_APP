import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PujaKitSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  rating: {
    type: Number,
  },
  cost_price: {
    type: Number,
    required: true,
  },
  selling_price: {
    type: Number,
    required: true,
  },
  stock_quantity: {
    type: Number,
    required: true,
  },
  minimum_stock_threshold: {
    type: Number,
    required: true,
  },
  supplier: {
    type: String,
  },
  specifications: [
    {
      type: String,
    },
  ],
  images: [
    {
      type: String,
    },
  ],
  items: [
    {
      type: String,
    },
  ],
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
});

export const PujaKit = mongoose.model("PujaKit", PujaKitSchema);
