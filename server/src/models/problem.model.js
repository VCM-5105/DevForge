import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Problem title is required"],
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy",
    },
    topic: {
      type: String,
      required: [true, "Topic is required"],
      trim: true,
    },
    platform: {
      type: String,
      default: "LeetCode",
      trim: true,
    },
    status: {
      type: String,
      enum: ["Solved", "Attempted", "To-Do"],
      default: "Solved",
    },
    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Problem = mongoose.model("Problem", problemSchema);
export default Problem;
