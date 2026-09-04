import Problem from "../models/problem.model.js";

export const createProblem = async (req, res) => {
  try {
    const { title, difficulty, topic, platform, status, notes } = req.body;

    if (!title || !topic) {
      return res.status(400).json({
        success: false,
        message: "Title and Topic are required fields",
      });
    }

    const problem = await Problem.create({
      user: req.user._id, 
      title,
      difficulty,
      topic,
      platform,
      status,
      notes,
    });

    return res.status(201).json({
      success: true,
      message: "Problem created successfully",
      data: problem,
    });
  } catch (error) {
    console.error("Create Problem Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error creating problem",
    });
  }
};

export const getProblems = async (req, res) => {
  try {
    // Return only problems belonging to req.user._id
    const problems = await Problem.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: problems.length,
      data: problems,
    });
  } catch (error) {
    console.error("Get Problems Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error fetching problems",
    });
  }
};

export const getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: problem,
    });
  } catch (error) {
    console.error("Get Problem By ID Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error fetching problem",
    });
  }
};

export const updateProblem = async (req, res) => {
  try {
    let problem = await Problem.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found or unauthorized",
      });
    }

    problem = await Problem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: "Problem updated successfully",
      data: problem,
    });
  } catch (error) {
    console.error("Update Problem Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error updating problem",
    });
  }
};

export const deleteProblem = async (req, res) => {
  try {
    const problem = await Problem.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found or unauthorized",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Problem deleted successfully",
    });
  } catch (error) {
    console.error("Delete Problem Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error deleting problem",
    });
  }
};
