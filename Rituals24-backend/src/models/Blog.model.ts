import mongoose from "mongoose";
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, default: "" },
    status: {
      type: String,
      enum: ["draft", "published", "scheduled"],
      default: "draft",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    featuredImage: { type: String },
    imageAlt: { type: String },
    imageCaption: { type: String },
    metaTitle: { type: String },
    metaDescription: { type: String },
    primaryKeyword: { type: String },
    secondaryKeywords: { type: String },
    scheduledAt: { type: Date },
    views: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const Blog = mongoose.model("Blog", blogSchema);
