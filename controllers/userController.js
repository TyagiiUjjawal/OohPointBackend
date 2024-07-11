// backend/controllers/userController.js

import User from '../models/User.js';

export const createUser = async (req, res) => {
    const { email, name, password } = req.body;

    try {
        const user = new User({ email, password, name });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
