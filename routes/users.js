// backend/routes/users.js

import express from "express";
import { addCampaign, createUser, getAllUsers } from "../controllers/userController.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.put("/", addCampaign);

export default router;
