// backend/routes/users.js

import express from "express";
import {
  addCampaign,
  addCity,
  createUser,
  getAllUsers,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.put("/", addCampaign);
router.put("/addcity", addCity);

export default router;
