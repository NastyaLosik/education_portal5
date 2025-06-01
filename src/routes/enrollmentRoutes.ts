import express from "express";
import { enrollmentController } from "../controllers/enrollmentController";

const router = express.Router();

router.post("/enroll", enrollmentController.enroll);
router.get("/user/:userId", enrollmentController.getEnrollmentsByUser);
router.get("/course/:courseId", enrollmentController.getEnrollmentsByCourse);
router.post("/complete-lesson", enrollmentController.completeLesson);
router.post("/unenroll", enrollmentController.unenroll);
router.get("/:courseId/students", enrollmentController.getStudents);

export const enrollmentRoutes = router;