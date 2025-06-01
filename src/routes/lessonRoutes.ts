import { Router } from "express";
import { lessonController } from "../controllers/lessonController";
const router = Router();

router.post("/create", lessonController.createLesson);
router.get("/all", lessonController.getAllLessons);
router.get("/:id", lessonController.getLessonById);
router.put("/update/:id", lessonController.updateLesson);
router.delete("/:id", lessonController.deleteLesson);

export const lessonRoutes = router;
