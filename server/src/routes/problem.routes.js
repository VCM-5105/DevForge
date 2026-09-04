import express from "express";
import {
  createProblem,
  getProblems,
  getProblemById,
  updateProblem,
  deleteProblem,
} from "../controllers/problem.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.route("/").get(getProblems).post(createProblem);
router.route("/:id").get(getProblemById).put(updateProblem).delete(deleteProblem);

export default router;
