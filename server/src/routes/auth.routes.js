import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

// Public auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected profile routes
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, upload.single("avatar"), updateUserProfile);

export default router;
