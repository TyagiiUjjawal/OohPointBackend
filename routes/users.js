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
router.post('/forget', updatePassword);

export default router;
