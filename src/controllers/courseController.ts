import { Request, Response } from "express";
import { courseService } from "../services/courseService";

export const courseController = {
  createCourse: async (req: Request, res: Response) => {
    try {
      const courseData = req.body;
      let imagePath = "";
      if (req.file) {
        imagePath = `/uploads/${req.file.filename}`;
      } else if (courseData.image) {
        imagePath = courseData.image;
      }
      const course = await courseService.createCourse({
        ...courseData,
        image: imagePath,
      });
      res.status(201).json(course);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },

  getAllCourses: async (req: Request, res: Response) => {
    try {
      const courses = await courseService.getAllCourses();
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  getCourseById: async (req: Request, res: Response) => {
    try {
      const course = await courseService.getCourseById(req.params.id);
      res.status(200).json(course);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  },

  updateCourse: async (req: Request, res: Response) => {
    try {
      let imagePath = req.body.image || "";
      if (req.file) {
        imagePath = `/uploads/${req.file.filename}`;
      }
      const updatedCourse = await courseService.updateCourse(req.params.id, {
        ...req.body,
        image: imagePath,
      });
      res.status(200).json(updatedCourse);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  },

  deleteCourse: async (req: Request, res: Response) => {
    try {
      await courseService.deleteCourse(req.params.id);
      res.status(200).json({ message: "Курс удален" });
    } catch (error) {
      res.status(404).json({ message: error });
    }
  },
  createTag: async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      const newTag = await courseService.createTag(name);
      res.status(201).json(newTag);
    } catch (error) {
      res.status(500).json({ message: "Ошибка при создании тега" });
    }
  },
  getAllTags: async (req: Request, res: Response) => {
    try {
      const tags = await courseService.getAllTags();
      res.json(tags);
    } catch (error) {
      res.status(500).json({ message: "Ошибка при получении тегов" });
    }
  },
  getCoursesByTag: async (req: Request, res: Response) => {
    try {
      const { tagName } = req.params;
      const courses = await courseService.getCoursesByTag(tagName);
      res.json(courses);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  },
};
