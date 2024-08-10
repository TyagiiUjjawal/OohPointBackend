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
router.put('/forget', updatePassword);
router.delete("/delete/:clientId", deleteUser);

export default router;
