import mongoose from "mongoose";
const Schema = mongoose.Schema;

const InventorySchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PujaKit",
    required: true,
  },
  quantity_change: {
    type: Number,
    required: true,
  },
  change_type: {
    type: String,
    required: true,
  },
  change_date: {
    type: Date,
    default: Date.now,
  },
});

export const Inventory = mongoose.model("Inventory", InventorySchema);
