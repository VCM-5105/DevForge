import Goal from "../models/goal.model.js";

export const createGoal = async (req, res) => {
  try {
    const { title, target, current, deadline, status } = req.body;

    if (!title || target === undefined) {
      return res.status(400).json({
        success: false,
        message: "Goal title and target value are required",
      });
    }

    const goal = await Goal.create({
      user: req.user._id,
      title,
      target,
      current: current !== undefined ? current : 0,
      deadline,
      status,
    });

    return res.status(201).json({
      success: true,
      message: "Goal created successfully",
      data: goal,
    });
  } catch (error) {
    console.error("Create Goal Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error creating goal",
    });
  }
};

export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: goals.length,
      data: goals,
    });
  } catch (error) {
    console.error("Get Goals Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error fetching goals",
    });
  }
};


export const getGoalById = async (req, res) => {
  try {
    const goal = await Goal.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: "Goal not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: goal,
    });
  } catch (error) {
    console.error("Get Goal By ID Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error fetching goal",
    });
  }
};

export const updateGoal = async (req, res) => {
  try {
    let goal = await Goal.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: "Goal not found or unauthorized",
      });
    }

    goal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: "Goal updated successfully",
      data: goal,
    });
  } catch (error) {
    console.error("Update Goal Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error updating goal",
    });
  }
};

export const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: "Goal not found or unauthorized",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Goal deleted successfully",
    });
  } catch (error) {
    console.error("Delete Goal Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error deleting goal",
    });
  }
};
