import { Router } from "express";
import { authController } from "../controllers/authController";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authController.getUserData);
router.get("/users", authController.getAllUsers);
router.delete("/:username", authController.deleteUser);

export const authRoutes = router;
