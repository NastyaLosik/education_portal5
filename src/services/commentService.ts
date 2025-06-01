import { Comment, CommentModel } from "../models/comment";

const createComment = async (commentData: Comment) => {
  if (commentData.text.length > 255) {
    throw new Error("Текст не должен превышать 255 символов");
  }
  const comment = new CommentModel(commentData);
  await comment.save();
  return comment;
};

const getAllComments = async () => {
  return await CommentModel.find();
};

const updateComment = async (id: string, updatedData: Partial<Comment>) => {
  const comment = await CommentModel.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  if (!comment) {
    throw new Error("Комментарий не найден");
  }
  return comment;
};

const deleteComment = async (id: string) => {
  const comment = await CommentModel.findByIdAndDelete(id);
  if (!comment) {
    throw new Error("Комментарий не найден");
  }
};

export const commentService = {
  createComment,
  getAllComments,
  updateComment,
  deleteComment,
};
