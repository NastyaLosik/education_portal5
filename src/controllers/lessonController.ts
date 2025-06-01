import { Request, Response } from "express";
import { lessonService } from "../services/lessonService";

export const lessonController = {
  createLesson: async (req: Request, res: Response) => {
    try {
      const lessonData = req.body;
      const lesson = await lessonService.createLesson(lessonData);
      res.status(201).json(lesson);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },

  getAllLessons: async (req: Request, res: Response) => {
    try {
      const lessons = await lessonService.getAllLessons();
      res.status(200).json(lessons);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  getLessonById: async (req: Request, res: Response) => {
    try {
      const lesson = await lessonService.getLessonById(req.params.id);
      res.status(200).json(lesson);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  },

  updateLesson: async (req: Request, res: Response) => {
    try {
      const updatedLesson = await lessonService.updateLesson(req.params.id, {
        ...req.body,
      });
      res.status(200).json(updatedLesson);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  },

  deleteLesson: async (req: Request, res: Response) => {
    try {
      await lessonService.deleteLesson(req.params.id);
      res.status(200).json({ message: "Урок удален" });
    } catch (error) {
      res.status(404).json({ message: error });
    }
  },
};
