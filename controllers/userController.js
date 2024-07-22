// backend/controllers/userController.js

import User from "../models/User.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  const { email, name, password, brandName, businessName, subscription } =
    req.body;
  const generateUniqueId = () => {
    return uuidv4().replace(/-/g, "").substring(0, 6);
  };
  const clientId = generateUniqueId();

  try {
    const user = new User({
      email,
      password,
      name,
      subscription,
      brandName,
      businessName,
      clientId,
    });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updatePassword = async (req, res) => {
  const { clientId, newPassword } = req.body;

  try {
    // Find the user by ID
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    const user = await User.findOneAndUpdate(
      { clientId: clientId },
      {
        password: hashedPassword,
      }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
