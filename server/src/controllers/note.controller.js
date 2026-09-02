import Note from "../models/note.model.js";

/**
 * @desc    Create a new note
 * @route   POST /api/notes
 * @access  Private
 */
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Note title and content are required",
      });
    }

    const note = await Note.create({
      user: req.user._id,
      title,
      content,
    });

    return res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: note,
    });
  } catch (error) {
    console.error("Create Note Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error creating note",
    });
  }
};

/**
 * @desc    Get all notes for logged-in user
 * @route   GET /api/notes
 * @access  Private
 */
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: notes.length,
      data: notes,
    });
  } catch (error) {
    console.error("Get Notes Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error fetching notes",
    });
  }
};

/**
 * @desc    Get note by ID
 * @route   GET /api/notes/:id
 * @access  Private
 */
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: note,
    });
  } catch (error) {
    console.error("Get Note By ID Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error fetching note",
    });
  }
};

/**
 * @desc    Update note
 * @route   PUT /api/notes/:id
 * @access  Private
 */
export const updateNote = async (req, res) => {
  try {
    let note = await Note.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found or unauthorized",
      });
    }

    note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: note,
    });
  } catch (error) {
    console.error("Update Note Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error updating note",
    });
  }
};

/**
 * @desc    Delete note
 * @route   DELETE /api/notes/:id
 * @access  Private
 */
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found or unauthorized",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.error("Delete Note Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error deleting note",
    });
  }
};
