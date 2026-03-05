import express from "express";
import dotenv from "dotenv";
import { pool } from "./db.js";
import productsRouter from "./products.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); 

app.use("/products", productsRouter);

app.listen(5050, () => {
    console.log("Server running on port 5050");
});