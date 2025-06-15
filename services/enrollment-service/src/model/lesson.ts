import { model, Document, Model, Schema, Types } from "mongoose";

export interface Lesson extends Document {
  title: string;
  videoUrl?: string;
  content?: string;
  course: Types.ObjectId;
  other?: number;
  createdAt: Date;
}

type LessonModel = Model<Lesson, object>;

const LessonSchema = new Schema<Lesson, LessonModel>({
  title: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: false,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  other: {
    type: Number,
    required: false,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

export const LessonModel = model<Lesson, LessonModel>("Lesson", LessonSchema);
