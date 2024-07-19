// backend/server.js

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import imageRoutes from "./routes/image.js";
import campaignRoutes from "./routes/campaignRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/login", authRoutes);
app.use("/api/client", userRoutes);
app.use("/api/campaigns", campaignRoutes);
app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use("/api", imageRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
