import { Request, Response } from "express";
import { enrollmentService } from "../services/enrollmentService";

export const enrollmentController = {
  enroll: async (req: Request, res: Response): Promise<void> => {
    try {
      const enrollData = req.body;

      if (!enrollData.user || !enrollData.course) {
        res.status(400).json({ message: "user и course обязательны" });
        return;
      }

      const enrollment = await enrollmentService.enrollInCourse(enrollData);
      res.status(201).json(enrollment);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  getEnrollmentsByUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;
      const enrollments =
        await enrollmentService.getEnrollmentsByUserId(userId);
      res.json(enrollments);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  getEnrollmentsByCourse: async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const { courseId } = req.params;
      const enrollments =
        await enrollmentService.getEnrollmentsByCourseId(courseId);
      res.json(enrollments);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  completeLesson: async (req: Request, res: Response): Promise<void> => {
    try {
      const { user, course, lesson } = req.body;

      if (!user || !course || !lesson) {
        res.status(400).json({ message: "Все поля обязательны" });
        return;
      }

      const updatedEnrollment = await enrollmentService.markLessonCompleted(
        user,
        course,
        lesson,
      );
      res.status(200).json(updatedEnrollment);
      return;
    } catch (error: any) {
      res.status(500).json({ message: error.message });
      return;
    }
  },
  unenroll: async (req: Request, res: Response): Promise<void> => {
    try {
      const enrollmentDate = req.body;

      if (!enrollmentDate.user || !enrollmentDate.course) {
        res.status(400).json({ message: "userId и courseId обязательны" });
        return;
      }

      await enrollmentService.unenrollFromCourse(enrollmentDate);
      res.json({ message: "Запись на курс отменена" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  getStudents: async (req: Request, res: Response): Promise<void> => {
    try {
      const { courseId } = req.params;

      if (!courseId) {
        res.status(400).json({ message: "courseId обязателен" });
        return;
      }

      const result = await enrollmentService.getStudents(courseId);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
};
