// routes/image.js

import express from "express";
import multer from "multer";
import Video from "../models/Video.js";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up multer for file storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/video/upload", upload.single("video"), async (req, res) => {
  try {
    const { id } = req.body;
    const { buffer, mimetype } = req.file;

    const newVideo = new Video({
      id,
      videoUrl: `/api/video/${id}`,
      video: {
        data: buffer,
        contentType: mimetype,
      },
    });

    await newVideo.save();

    res.status(201).json({
      message: "Video uploaded successfully",
      videoUrl: newVideo.videoUrl,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to serve images
router.get("/video/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findOne({ id });

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.set("Content-Type", video.video.contentType);
    res.send(video.video.data);
  } catch (error) {
    console.error("Fetch video error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
