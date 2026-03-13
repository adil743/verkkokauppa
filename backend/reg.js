import express from "express";
import { pool } from "./db.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const { email, password } = req.body;

    if(!email) {
        return res.status(400).json({ message: "Email is required!"});
    }
    if(!password) {
        return res.status(400).json({ message: "Password is required!"});
    }

    if(password.length < 6) {
        return res.status(400).json({ message: "Password is too short. Minimum 6 characters!"})
    }

});

export default router;