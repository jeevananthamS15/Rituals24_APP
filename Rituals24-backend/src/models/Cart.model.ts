import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ITEM_TYPES = ["Puja", "Bhajan", "Temple", "Pandit", "PujaKit"] as const;
type ItemType = (typeof ITEM_TYPES)[number];

const refModelFor: Record<ItemType, string> = {
  Puja: "Puja",
  Bhajan: "Bhajan",
  Temple: "Temple",
  Pandit: "Pandit",
  PujaKit: "PujaKit",
};

const CartItemSchema = new Schema(
  {
    itemType: {
      type: String,
      enum: ITEM_TYPES,
      required: true,
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "items.itemType",
    },

    // Snapshot fields — stored at add-time so the cart displays correctly
    // even if the source document changes later.
    name: { type: String, required: true },
    image: { type: String },
    price: { type: Number, required: true },

    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },

    // For Temple items: which special_pooja subdocument was selected
    selectedPoojaId: {
      type: mongoose.Schema.Types.ObjectId,
    },

    // For Bhajan items: which BhajanPlan the user selected
    selectedPlanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BhajanPlan",
    },

    // Scheduling — applies to Puja, Bhajan, Pandit, and Temple bookings
    scheduledDate: { type: Date },
    scheduledTime: { type: String }, // e.g. "10:00 AM"

    // Free-form notes: preferred language, location, special requirements, etc.
    notes: { type: String },
  },
  { _id: true },
);

// Derived total for a single line item
CartItemSchema.virtual("lineTotal").get(function () {
  return this.price * this.quantity;
});

const CartSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one active cart per user
    },
    items: [CartItemSchema],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Grand total across all items
CartSchema.virtual("grandTotal").get(function () {
  return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
});

export const Cart = mongoose.model("Cart", CartSchema);
