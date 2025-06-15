import { CallbackError, model, Document, Model, Schema, Types } from "mongoose";
import slugify from "slugify";

export interface Course extends Document {
  title: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  published: boolean;
  author: string;
  createdAt: Date;
  tags: Types.ObjectId[];
}

type CourseModel = Model<Course, object>;

const courseSchema = new Schema<Course, CourseModel>({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    required: true,
    default: "beginner",
  },
  published: {
    type: Boolean,
    required: true,
    default: false,
  },
  author: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
});

courseSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export const CourseModel = model<Course, CourseModel>("Course", courseSchema);
