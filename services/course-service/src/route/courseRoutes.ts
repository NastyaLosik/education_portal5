import { Router } from "express";
import { courseController } from "../controller/courseController";
import { upload } from "../middlewares/uploadMiddleware";
const router = Router();

router.post("/course", upload.single("image"), courseController.createCourse);
router.get("/courses", courseController.getAllCourses);
router.get("/courses/:id", courseController.getCourseById);
router.put(
  "/courses/:id",
  upload.single("image"),
  courseController.updateCourse,
);
router.delete("/courses/:id", courseController.deleteCourse);
router.post("/tag", courseController.createTag);
router.get("/tags", courseController.getAllTags);
router.get("/:tagName", courseController.getCoursesByTag);

export const courseRoutes = router;
