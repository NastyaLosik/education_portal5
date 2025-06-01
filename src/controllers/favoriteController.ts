import { Request, Response } from "express";
import { authService } from "../services/authService";

export const favoriteController = {
  addToFavorite: async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;
      const { courseId } = req.body;

      if (!courseId) {
        res.status(400).json({ message: "courseId обязателен" });
      }

      const updatedUser = await authService.addToFavorite(userId, courseId);
      res.status(200).json(updatedUser);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  },

  removeFromFavorites: async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId, courseId } = req.params;
      const updatedUser = await authService.removeFromFavorites(
        userId,
        courseId,
      );
      res.status(200).json(updatedUser);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  },

  getFavoriteCourses: async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;
      const courses = await authService.getFavoriteCourses(userId);
      res.status(200).json(courses);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
};
