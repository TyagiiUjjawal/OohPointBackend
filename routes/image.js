// routes/image.js

import express from "express";
import multer from "multer";
import Image from "../models/Image.js";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up multer for file storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.body;
    const { buffer, mimetype } = req.file;

    const newImage = new Image({
      id,
      imageUrl: `/api/image/${id}`,
      image: {
        data: buffer,
        contentType: mimetype,
      },
    });

    await newImage.save();

    res.status(201).json({
      message: "Image uploaded successfully",
      imageUrl: newImage.imageUrl,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to serve images
router.get("/image/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Image.findOne({ id });

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.set("Content-Type", image.image.contentType);
    res.send(image.image.data);
  } catch (error) {
    console.error("Fetch image error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
