import { Enrollment, EnrollmentModel } from "../model/enrollment";
import { LessonModel } from "../model/lesson";
import { Types } from "mongoose";
import amqplib from "amqplib";

let channel: any;

const connectRabbitMQ = async () => {
  const connection = await amqplib.connect("amqp://localhost");

  channel = await connection.createChannel();
  await channel.assertQueue("course_enrollments");

  channel.consume("course_enrollments", async (msg: any) => {
    if (msg) {
      const content = JSON.parse(msg.content.toString());
      const enrollData = content;

      try {
        await processEnrollment(enrollData);
        channel.ack(msg);
      } catch (error) {
        console.error("Ошибка при обработке:", error);
        await EnrollmentModel.findByIdAndUpdate(enrollData._id, {
          status: "failed",
        });
        channel.ack(msg);
      }
    }
  });
};

const enrollInCourse = async (enrollData: any) => {
  const { user, course } = enrollData;

  const existingEnrollment = await EnrollmentModel.findOne({
    user: user,
    course: course,
  });

  if (existingEnrollment) {
    throw new Error("Вы уже записаны на этот курс");
  }

  const enrollment = await EnrollmentModel.create({
    user,
    course,
    progress: 0,
    status: "pending",
  });

  const message = JSON.stringify({
    enrollmentId: enrollData._id,
    user,
    course,
  });

  channel.sendToQueue("course_enrollments", Buffer.from(message));

  return enrollment;
};

const processEnrollment = async (enrollData: any) => {
  try {
    await EnrollmentModel.findByIdAndUpdate(enrollData._id, {
      status: "processing",
    });

    const totalLessons = await LessonModel.countDocuments({
      course: enrollData.course,
    });

    await EnrollmentModel.findByIdAndUpdate(enrollData._id, {
      status: "completed",
      progress: 0,
    });
  } catch (error) {
    await EnrollmentModel.findByIdAndUpdate(enrollData._id, {
      status: "failed",
    });
    throw error;
  }
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

const getEnrollmentStatus = async(userId: string, courseId: string) => {
  const enrollment = await EnrollmentModel.findOne({ user: userId, course: courseId });

  if (!enrollment) {
    throw new Error("Нет записи на курс");
  }

  return {
    status: enrollment.status,
    progress: enrollment.progress,
  };
};

export const enrollmentService = {
  connectRabbitMQ,
  enrollInCourse,
  getEnrollmentsByUserId,
  getEnrollmentsByCourseId,
  markLessonCompleted,
  unenrollFromCourse,
  getStudents,
  getEnrollmentStatus,
};
