import express from "express";
import { pool } from "./db.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT id, producer_id, category_id, name, stock, unit, prize, description FROM products ");
        res.json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "DB error"});
    }
}); 

export default router;