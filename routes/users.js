// backend/routes/users.js

import express from "express";
import {
  createUser,
  getAllUsers,
  updatePassword,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.patch('/forget', updatePassword);

export default router;
