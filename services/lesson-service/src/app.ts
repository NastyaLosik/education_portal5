import express from "express";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
import path from "path";
import { lessonRoutes } from "./route/lessonRoutes";

dotenv.config();
const PORT = process.env.PORT || 3003;

connectDB();

const app = express();
app.use(express.json());

app.use("/api", lessonRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
