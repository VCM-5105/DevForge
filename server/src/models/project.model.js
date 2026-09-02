import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },
    techStack: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["Planned", "In Progress", "Completed"],
      default: "In Progress",
    },
    github: {
      type: String,
      default: "",
    },
    liveUrl: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
