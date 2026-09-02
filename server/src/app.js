import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Import Routes
import authRouter from "./routes/auth.routes.js";
import problemRouter from "./routes/problem.routes.js";
import goalRouter from "./routes/goal.routes.js";
import projectRouter from "./routes/project.routes.js";
import resourceRouter from "./routes/resource.routes.js";
import noteRouter from "./routes/note.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Serve static uploaded files (profile avatars, attachments)
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "DevForge API Server is running smoothly!",
  });
});

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/problems", problemRouter);
app.use("/api/goals", goalRouter);
app.use("/api/projects", projectRouter);
app.use("/api/resources", resourceRouter);
app.use("/api/notes", noteRouter);

// 404 Route handler for undefined endpoints
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl} - Route not found`,
  });
});

export default app;