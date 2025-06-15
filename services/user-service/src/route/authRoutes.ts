import { Router } from "express";
import { authController } from "../controller/authController";
import { favoriteController } from "../controller/favoriteController";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authController.getUserData);
router.get("/users", authController.getAllUsers);
router.delete("/:username", authController.deleteUser);
router.post("/:userId", favoriteController.addToFavorite);
router.delete("/:userId/:courseId", favoriteController.removeFromFavorites);
router.get("/:userId", favoriteController.getFavoriteCourses);

export const authRoutes = router;
