import express from "express";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
import path from "path";
import { courseRoutes } from "./route/courseRoutes";

dotenv.config();
const PORT = process.env.PORT || 3002;

connectDB();

const app = express();
app.use(express.json());

app.use("/api", courseRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
