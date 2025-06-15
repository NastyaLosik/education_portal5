import express from "express";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
import { enrollmentRoutes } from "./route/enrollmentRoutes";

dotenv.config();
const PORT = process.env.PORT || 3005;

connectDB();

const app = express();
app.use(express.json());

app.use("/api", enrollmentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
