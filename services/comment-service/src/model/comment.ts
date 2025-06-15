import { model, Document, Model, Schema, Types } from "mongoose";

export interface Comment extends Document {
  user: Types.ObjectId;
  lesson: Types.ObjectId;
  text: string;
}

type CommentModel = Model<Comment, object>;

const CommentSchema = new Schema<Comment, CommentModel>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  lesson: {
    type: Schema.Types.ObjectId,
    ref: "Lesson",
    required: true,
  },
  text: {
    type: String,
    required: false,
    maxlength: [255, "Текст не должен превышать 255 символов"],
  },
});

export const CommentModel = model<Comment, CommentModel>(
  "Comment",
  CommentSchema,
);
