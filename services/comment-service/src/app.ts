import express from "express";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
import { commentRoutes } from "./route/commentRoutes";

dotenv.config();
const PORT = process.env.PORT || 3004;

connectDB();

const app = express();
app.use(express.json());

app.use("/api", commentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
