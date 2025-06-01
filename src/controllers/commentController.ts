import { Request, Response } from "express";
import { commentService } from "../services/commentService";

export const commentController = {
  createComment: async (req: Request, res: Response) => {
    try {
      const commentData = req.body;
      const comment = await commentService.createComment(commentData);
      res.status(201).json(comment);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },

  getAllComments: async (req: Request, res: Response) => {
    try {
      const comments = await commentService.getAllComments();
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  updateComment: async (req: Request, res: Response) => {
    try {
      const updatedComment = await commentService.updateComment(req.params.id, {
        ...req.body,
      });
      res.status(200).json(updatedComment);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  },

  deleteComment: async (req: Request, res: Response) => {
    try {
      await commentService.deleteComment(req.params.id);
      res.status(200).json({ message: "Комментарий удален" });
    } catch (error) {
      res.status(404).json({ message: error });
    }
  },
};
