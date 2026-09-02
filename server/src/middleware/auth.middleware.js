import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

/**
 * Authentication Middleware
 * Verifies JWT token sent in the Authorization header (Bearer <token>)
 * Attaches the authenticated user object to req.user
 */
export const protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header (e.g. "Bearer eyJhbGci...")
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token from "Bearer <token>"
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "devforge_fallback_secret"
      );

      // Find user in database, exclude password field
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "User not found, authorization failed",
        });
      }

      next(); // Proceed to next middleware or controller
    } catch (error) {
      console.error("Auth Middleware Error:", error.message);
      return res.status(401).json({
        success: false,
        message: "Not authorized, token failed or expired",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token provided",
    });
  }
};
