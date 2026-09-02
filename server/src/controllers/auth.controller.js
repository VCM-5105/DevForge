import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields (name, email, password)",
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      // Generate JWT token
      const token = generateToken(user._id);

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          bio: user.bio,
          skills: user.skills,
          github: user.github,
          linkedin: user.linkedin,
          avatar: user.avatar,
          token,
        },
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid user data",
      });
    }
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error during registration",
    });
  }
};

/**
 * @desc    Authenticate user & get token (Login)
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });

    // Check user & match password
    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);

      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          bio: user.bio,
          skills: user.skills,
          github: user.github,
          linkedin: user.linkedin,
          avatar: user.avatar,
          token,
        },
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error during login",
    });
  }
};

/**
 * @desc    Get user profile
 * @route   GET /api/auth/profile
 * @access  Private
 */
export const getUserProfile = async (req, res) => {
  try {
    // req.user is set by auth middleware
    const user = await User.findById(req.user._id).select("-password");

    if (user) {
      return res.status(200).json({
        success: true,
        data: user,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    console.error("Get Profile Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error getting profile",
    });
  }
};

/**
 * @desc    Update user profile & avatar
 * @route   PUT /api/auth/profile
 * @access  Private
 */
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update fields if provided
    user.name = req.body.name || user.name;
    user.bio = req.body.bio !== undefined ? req.body.bio : user.bio;
    user.github = req.body.github !== undefined ? req.body.github : user.github;
    user.linkedin = req.body.linkedin !== undefined ? req.body.linkedin : user.linkedin;

    // Handle skills array (can be sent as JSON string or array)
    if (req.body.skills) {
      if (typeof req.body.skills === "string") {
        user.skills = req.body.skills.split(",").map((s) => s.trim());
      } else if (Array.isArray(req.body.skills)) {
        user.skills = req.body.skills;
      }
    }

    // If user uploaded a new avatar file via Multer
    if (req.file) {
      user.avatar = `/uploads/${req.file.filename}`;
    }

    // If password update is requested
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        bio: updatedUser.bio,
        skills: updatedUser.skills,
        github: updatedUser.github,
        linkedin: updatedUser.linkedin,
        avatar: updatedUser.avatar,
      },
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error updating profile",
    });
  }
};
