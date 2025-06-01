import { Enrollment, EnrollmentModel } from "../models/enrollment";
import { LessonModel } from "../models/lesson";
import { Types } from "mongoose";

const enrollInCourse = async (enrollData: any) => {
  const { user, course } = enrollData;

  const enrollment = await EnrollmentModel.create({
    user,
    course,
    progress: 0,
  });

  return enrollment;
};

const getEnrollmentsByUserId = async (userId: string) => {
  return await EnrollmentModel.find({ user: userId })
    .populate("course", "title description")
    .exec();
};

const getEnrollmentsByCourseId = async (courseId: string) => {
  return await EnrollmentModel.find({ course: courseId })
    .populate("user", "username email")
    .exec();
};

export const markLessonCompleted = async (
  userId: string,
  courseId: string,
  lessonId: string,
) => {
  const lesson = await LessonModel.findOne({
    _id: lessonId,
    course: courseId,
  });

  if (!lesson) {
    throw new Error("Урок не найден или не принадлежит курсу");
  }

  let enrollment = await EnrollmentModel.findOne({
    user: userId,
    course: courseId,
  });

  if (!enrollment) {
    enrollment = new EnrollmentModel({ user: userId, course: courseId });
  }

  const alreadyCompleted = enrollment.completedLessons.some(
    (id) => id.toString() === lessonId,
  );

  if (alreadyCompleted) {
    return enrollment;
  }

  enrollment.completedLessons.push(new Types.ObjectId(lessonId));
  const totalLessons = await LessonModel.countDocuments({ course: courseId });
  const completedCount = enrollment.completedLessons.length;
  enrollment.progress = Math.round((completedCount / totalLessons) * 100);
  await enrollment.save();
  return enrollment;
};
const unenrollFromCourse = async (enrollmentDate: Enrollment) => {
  const result = await EnrollmentModel.deleteOne({
    user: enrollmentDate.user,
    course: enrollmentDate.course,
  });

  if (result.deletedCount === 0) {
    throw new Error("Запись не найдена");
  }

  return { message: "Вы успешно отменили запись" };
};
const getStudents = async (courseId: string) => {
  const enrollments = await EnrollmentModel.find({ course: courseId }).populate(
    "user",
    "firstName secondName",
  );

  return {
    enrollments,
    count: enrollments.length,
  };
};

export const enrollmentService = {
  enrollInCourse,
  getEnrollmentsByUserId,
  getEnrollmentsByCourseId,
  markLessonCompleted,
  unenrollFromCourse,
  getStudents,
};
