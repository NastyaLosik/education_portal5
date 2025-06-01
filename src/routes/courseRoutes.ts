import { Router } from "express";
import { courseController } from "../controllers/courseController";
import { upload, Image } from "../middlewares/uploadMiddleware";
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
router.post("/upload", Image);

export const courseRoutes = router;
