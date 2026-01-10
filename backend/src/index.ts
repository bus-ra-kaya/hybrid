import "dotenv/config";
import prisma from "./prisma.js";
import express from "express";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Testing");
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
})
