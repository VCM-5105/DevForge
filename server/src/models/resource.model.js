import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Resource title is required"],
      trim: true,
    },
    type: {
      type: String,
      default: "Documentation",
      trim: true,
    },
    url: {
      type: String,
      required: [true, "Resource URL is required"],
      trim: true,
    },
    category: {
      type: String,
      default: "General",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Resource = mongoose.model("Resource", resourceSchema);
export default Resource;
