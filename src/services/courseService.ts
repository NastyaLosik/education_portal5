import { CourseModel, Course } from "../models/course";
import { TagModel } from "../models/tag";

const createCourse = async (courseData: Omit<Course, "slug" | "createdAt">) => {
  const course = new CourseModel({
    ...courseData,
    createdAt: new Date(),
  });

  await course.save();
  return course;
};

const getAllCourses = async () => {
  return await CourseModel.find();
};

const getCourseById = async (id: string) => {
  const course = await CourseModel.findById(id);
  if (!course) {
    throw new Error("Курс не найден");
  }
  return course;
};

const updateCourse = async (
  id: string,
  updatedData: Partial<Omit<Course, "slug" | "createdAt">>,
) => {
  const course = await CourseModel.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  if (!course) {
    throw new Error("Курс не найден");
  }
  return course;
};

const deleteCourse = async (id: string) => {
  const course = await CourseModel.findByIdAndDelete(id);
  if (!course) {
    throw new Error("Курс не найден");
  }
};

const createTag = async (name: string) => {
  if (!name) {
    throw new Error("Название тега обязательно");
  }
  const existingTag = await TagModel.findOne({ name });
  if (existingTag) {
    throw new Error("Тег с таким названием уже существует");
  }
  const newTag = new TagModel({ name });
  await newTag.save();
  return newTag;
};

const getAllTags = async () => {
    return await TagModel.find();
}

const getCoursesByTag = async (tagName: string) => {
  const tag = await TagModel.findOne({ name: tagName });
  if (!tag) {
    throw new Error("Тег не найден");
  }
  const courses = await CourseModel.find({ tags: tag._id }).populate("tags");
  return courses;
};

export const courseService = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  createTag,
  getAllTags,
  getCoursesByTag,
};
