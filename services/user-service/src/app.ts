import express from "express";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
import path from "path";
import { authRoutes } from "./route/authRoutes";

dotenv.config();
const PORT = process.env.PORT || 3001;

connectDB();

const app = express();
app.use(express.json());

app.use("/api", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
