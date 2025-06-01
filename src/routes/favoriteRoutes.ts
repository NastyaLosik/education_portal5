import express from "express";
import { favoriteController } from "../controllers/favoriteController";

const router = express.Router();

router.post("/:userId", favoriteController.addToFavorite);
router.delete("/:userId/:courseId", favoriteController.removeFromFavorites);
router.get("/:userId", favoriteController.getFavoriteCourses);

export const favoriteRoutes = router;