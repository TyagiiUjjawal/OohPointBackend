// backend/routes/campaignRoutes.js

import express from "express";
import Campaign from "../models/Campaign.js";
import User from "../models/User.js";

const router = express.Router();

// Create a new campaign
router.post("/", async (req, res) => {
  const {
    clientId,
    campaignId,
    campaignLink,
    specialInstructions,
    campaignName,
    moq,
    startDate,
    endDate,
    links,
    targetAudience,
    budget,
    objective,
    geographic,
    channels,
    imageUrl,
    tags,
    freq,
    redirectLink,
    locationIp,
    ipAddress,
    isActive,
    cities,
  } = req.body;

  try {
    const campaign = new Campaign({
      campaignName,
      moq,
      startDate,
      endDate,
      links,
      clientId,
      campaignId,
      campaignLink,
      specialInstructions,
      targetAudience,
      budget,
      objective,
      geographic,
      channels,
      imageUrl,
      tags,
      freq,
      redirectLink,
      locationIp,
      ipAddress,
      isActive,
      cities,
    });

    const createdCampaign = await campaign.save();

    res.status(201).json(createdCampaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch campaigns for a user
router.get("/:clientId", async (req, res) => {
  try {
    const campaigns = await Campaign.find({ clientId: req.params.clientId });
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
