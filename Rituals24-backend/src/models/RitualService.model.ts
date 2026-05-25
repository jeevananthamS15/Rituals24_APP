import mongoose from "mongoose";
const Schema = mongoose.Schema;

const RitualServiceSchema = new Schema({
  name: {
    type: String,
  },
  category: {
    type: String,
  },
  price: {
    type: Number,
  },
  duration: {
    type: Number,
  },
  // options: [
  //   {
  //     type: String,
  //   },
  // ],
  status: {
    type: String,
    default: "active",
  },
});

export const RitualService = mongoose.model(
  "RitualService",
  RitualServiceSchema,
);
