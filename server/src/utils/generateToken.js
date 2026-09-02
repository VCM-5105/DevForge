import jwt from "jsonwebtoken";

/**
 * Generates a JSON Web Token (JWT) signed with the user's ID.
 * @param {string} userId - The MongoDB User ID
 * @returns {string} Signed JWT token
 */
export const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || "devforge_fallback_secret",
    {
      expiresIn: process.env.JWT_EXPIRE || "30d",
    }
  );
};
