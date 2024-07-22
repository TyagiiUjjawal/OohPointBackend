// backend/models/Campaign.js

import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema(
  {
    clientId: {
      type: String,
      required: true,
    },
    campaignName: {
      type: String,
      required: true,
    },
    moq: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    links: [
      {
        type: Object,
        required: true,
      },
    ],
    campaignId: {
      type: String,
      required: true,
    },
    campaignLink: {
      type: String,
      required: true,
    },
    specialInstructions: {
      type: String,
      required: true,
    },
    targetAudience: [
      {
        type: String,
        required: true,
      },
    ],
    budget: {
      type: String,
      required: true,
    },
    objective: {
      type: String,
      required: true,
    },
    geographic: [
      {
        type: String,
        required: true,
      },
    ],
    channels: [
      {
        type: String,
        required: true,
      },
    ],
    imageUrl: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
        required: true,
      },
    ],
    freq: {
      type: String,
      required: true,
    },
    redirectLink: {
      type: String,
      required: true,
    },
    locationIp: [
      {
        type: String,
        required: true,
      },
    ],
    ipAddress: [
      {
        type: Object,
        required: true,
      },
    ],
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    cities: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

const Campaign = mongoose.model("Campaign", campaignSchema);
export default Campaign;
