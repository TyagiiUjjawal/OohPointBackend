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
    video,
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
      redirects: 0,
      video,
      uuid: [],
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
    redirects,
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
    video,
    uuid,
  } = req.body;

  try {
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
        redirects,
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
        video,
        uuid,
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

router.delete("/:campaignId", async (req, res) => {
  try {
    const deletedCampaign = await Campaign.findOneAndDelete({
      campaignId: req.params.campaignId,
    });

    if (!deletedCampaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    res.status(200).json({ message: "Campaign deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
