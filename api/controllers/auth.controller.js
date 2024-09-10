import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

// Register User
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user in the database
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Failed to create user!" });
  }
};

// Login User
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user in the database
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) return res.status(400).json({ message: "Invalid credentials!" });

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials!" });

    // Generate JWT
    if (!process.env.JWT_SECRET_KEY) {
      console.error("JWT_SECRET_KEY is not defined in environment variables");
    }

    const age = 1000 * 60 * 60 * 24 * 7; // 1 week
    const token = jwt.sign(
      { id: user.id, isAdmin: false },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const { password: _, ...userInfo } = user; // Exclude password from user info

    // Set token in a cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Secure in production
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ message: "Failed to login!" });
  }
};

// Logout User
export const logout = (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure in production
    })
    .status(200)
    .json({ message: "Logout successful" });
};
