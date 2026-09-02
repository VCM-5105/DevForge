import dotenv from "dotenv";
import connectDB from "./config/db.js";
import app from "./app.js";

// Load environment variables from .env file
dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 5000;

// Connect to Database and start the server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`⚙️  DevForge Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed !!! ", err);
  });