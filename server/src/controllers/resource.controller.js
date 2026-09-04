import Resource from "../models/resource.model.js";

export const createResource = async (req, res) => {
  try {
    const { title, type, url, category } = req.body;

    if (!title || !url) {
      return res.status(400).json({
        success: false,
        message: "Title and URL are required fields",
      });
    }

    const resource = await Resource.create({
      user: req.user._id,
      title,
      type,
      url,
      category,
    });

    return res.status(201).json({
      success: true,
      message: "Resource saved successfully",
      data: resource,
    });
  } catch (error) {
    console.error("Create Resource Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error saving resource",
    });
  }
};

export const getResources = async (req, res) => {
  try {
    const resources = await Resource.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: resources.length,
      data: resources,
    });
  } catch (error) {
    console.error("Get Resources Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error fetching resources",
    });
  }
};


export const getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: resource,
    });
  } catch (error) {
    console.error("Get Resource By ID Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error fetching resource",
    });
  }
};

export const updateResource = async (req, res) => {
  try {
    let resource = await Resource.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found or unauthorized",
      });
    }

    resource = await Resource.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: "Resource updated successfully",
      data: resource,
    });
  } catch (error) {
    console.error("Update Resource Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error updating resource",
    });
  }
};


export const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found or unauthorized",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Resource deleted successfully",
    });
  } catch (error) {
    console.error("Delete Resource Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error deleting resource",
    });
  }
};
