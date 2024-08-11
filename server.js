// backend/server.js

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import imageRoutes from "./routes/image.js";
import videoRoutes from "./routes/video.js";
import campaignRoutes from "./routes/campaignRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

connectDB();

app.use(cors({
    origin: '*',  // This allows requests from any origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json({ limit: '50mb' }));  // Increase if necessary
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use("/api/login", authRoutes);
app.use("/api/client", userRoutes);
app.use("/api/campaigns", campaignRoutes);
app.get("/", (req, res) => {
  res.send("Helloo");
});
app.use("/api", imageRoutes);
app.use("/api", videoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
