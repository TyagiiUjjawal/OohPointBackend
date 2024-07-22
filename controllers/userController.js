// backend/controllers/userController.js

import User from "../models/User.js";
import { v4 as uuidv4 } from "uuid";

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

