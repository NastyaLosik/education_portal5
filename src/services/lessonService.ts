import { Lesson, LessonModel } from "../models/lesson";

const createLesson = async (lessonData: Lesson) => {
  const lesson = new LessonModel({
    ...lessonData,
    createdAt: new Date(),
  });

  await lesson.save();
  return lesson;
};

const getAllLessons = async () => {
  return await LessonModel.find().populate("course", "title");
};

const getLessonById = async (id: string) => {
  const lesson = await LessonModel.findById(id).populate("course", "title");
  if (!lesson) {
    throw new Error("Урок не найден");
  }
  return lesson;
};

const updateLesson = async (id: string, updatedData: Partial<Lesson>) => {
  const lesson = await LessonModel.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  if (!lesson) {
    throw new Error("Урок не найден");
  }
  return lesson;
};

const deleteLesson = async (id: string) => {
  const lesson = await LessonModel.findByIdAndDelete(id);
  if (!lesson) {
    throw new Error("Урок не найден");
  }
};

export const lessonService = {
  createLesson,
  getAllLessons,
  getLessonById,
  updateLesson,
  deleteLesson,
};
