// backend/routes/campaignRoutes.js

import express from "express";
import Campaign from "../models/Campaigns.js";

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
router.get("/:campaignId", async (req, res) => {
  try {
    const campaigns = await Campaign.findOne({
      campaignId: req.params.campaignId,
    });
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/client/:clientId", async (req, res) => {
  try {
    const campaigns = await Campaign.find({ clientId: req.params.clientId });
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const campaigns = await Campaign.find({});
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:campaignId", async (req, res) => {
  const {
    clientId,
    campaignId,
    campaignLink,
    specialInstructions,
    campaignName,
    moq,
    startDate,
    location,
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
    console.log(location[0].longitude + "location")
    const updatedCampaign = await Campaign.findOneAndUpdate(
      { campaignId: req.params.campaignId },
      {
        campaignName,
        moq,
        startDate,
        endDate,
        links,
        location,
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
      },
      { new: true } // This option returns the modified document rather than the original.
    );

    if (!updatedCampaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    res.status(200).json(updatedCampaign);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
