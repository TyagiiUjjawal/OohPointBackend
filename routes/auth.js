// backend/routes/auth.js

import express from 'express';
import { login, editPassword } from '../controllers/authController.js';

const router = express.Router();

router.post('/', login);
router.post("/forget", editPassword);

export default router;
