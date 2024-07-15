// backend/controllers/userController.js

import User from "../models/User.js";
import { v4 as uuidv4 } from "uuid";

export const createUser = async (req, res) => {
  const { email, name, password, subscription } = req.body;
  const generateUniqueId = () => {
    return uuidv4().replace(/-/g, "").substring(0, 6);
  };
  const clientId = generateUniqueId();
  const campaigns = [];

  try {
    const user = new User({
      email,
      password,
      name,
      subscription,
      clientId,
      campaigns,
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

export const addCampaign = async (req, res) => {
  const { campaign, clientId } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { clientId: clientId },
      { $push: { campaigns: campaign } },
      { new: true } // This returns the updated document
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addCity = async (req, res) => {
  const { campaign, clientId } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      {
        clientId: clientId,
        "campaigns.campaignId": campaign.campaignId, // Match based on campaign _id
      },
      {
        $set: {
          "campaigns.$": campaign, // Update the entire matched campaign object
        },
      },
      { new: true } // Return the updated document
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// export const addIp = async (req, res) => {
//     const { ipAddress, clientId } = req.body;
//     try {
//       const updatedUser = await User.findOneAndUpdate(
//         { clientId: clientId },
//         { $set: { ipAddress: ipAddress } },
//         { new: true } // This returns the updated document
//       );
//       if (!updatedUser) {
//         return res.status(404).json({ message: "User not found" });
//       }

//       res.status(200).json(updatedUser);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   };
