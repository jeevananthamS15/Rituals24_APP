import mongoose from "mongoose";
const Schema = mongoose.Schema;

const WishlistSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pujaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Puja",
    },
    panditId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    templeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Temple",
    },
    bhajanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bhajan",
    },
    pujaKitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PujaKit",
    },
  },
  { timestamps: true },
);

export const Wishlist = mongoose.model("Wishlist", WishlistSchema);
