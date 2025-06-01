import { Router } from "express";
import { commentController } from "../controllers/commentController";
const router = Router();

router.post("/create", commentController.createComment);
router.get("/all", commentController.getAllComments);
router.put("/update/:id", commentController.updateComment);
router.delete("/:id", commentController.deleteComment);

export const commentRoutes = router;
