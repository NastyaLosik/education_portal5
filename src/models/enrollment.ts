import { model, Document, Model, Schema, Types } from "mongoose";

export interface Enrollment extends Document {
  user: Types.ObjectId;
  course: Types.ObjectId;
  completedLessons: Types.ObjectId[];
  progress: number;
}

type EnrollmentModel = Model<Enrollment, object>;

const EnrollmentSchema = new Schema<Enrollment, EnrollmentModel>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  completedLessons: {
    type: [{ type: Schema.Types.ObjectId, ref: "Lesson" }],
    default: [],
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
});
EnrollmentSchema.index({ user:1, course:1}, {unique:true})
export const EnrollmentModel = model<Enrollment, EnrollmentModel>(
  "Enrollment",
  EnrollmentSchema,
);
