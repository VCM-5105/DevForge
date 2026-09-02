import express from "express";
import {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from "../controllers/note.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.route("/").get(getNotes).post(createNote);
router.route("/:id").get(getNoteById).put(updateNote).delete(deleteNote);

export default router;
