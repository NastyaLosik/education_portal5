import { CourseModel } from "../models/course";
import { UserModel } from "../models/user";
import jwt from "jsonwebtoken";

const registerUser = async (
  firstName: string,
  lastName: string,
  username: string,
  password: string,
  role: "student" | "teacher",
) => {
  const existingUser = await UserModel.findOne({ username });
  if (existingUser) {
    throw new Error("Пользователь уже существует");
  }
  const user = new UserModel({ firstName, lastName, username, password, role });
  await user.save();
  return user;
};

const loginUser = async (username: string, password: string) => {
  const user = await UserModel.findOne({ username });
  if (!user) {
    throw new Error("Пользователь не найден");
  }
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new Error("Неверный пароль");
  }
  return user;
};

const generateToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "1h" });
};

const getUserData = async (username: string) => {
  const user = await UserModel.findOne({ username });
  if (!user) {
    throw new Error("User not found!");
  }
  return user;
};

const deleteUser = async (username: string) => {
  const user = await UserModel.findOneAndDelete({ username });
  if (!user) {
    throw new Error("Пользователь не найден");
  }
};
const addToFavorite = async (userId: string, courseId: string) => {
  const user = await UserModel.findById(userId);
  if (!user) throw new Error("Пользователь не найден");

  const courseExists = await CourseModel.exists({ _id: courseId });
  if (!courseExists) throw new Error("Курс не найден");

  if (!user.favorites.includes(courseId)) {
    user.favorites.push(courseId);
    await user.save();
  }

  return user;
};

const removeFromFavorites = async (userId: string, courseId: string) => {
  const user = await UserModel.findById(userId);
  if (!user) throw new Error("Пользователь не найден");

  user.favorites = user.favorites.filter((fav) => fav !== courseId);
  await user.save();

  return user;
};
const getFavoriteCourses = async (userId: string) => {
  const user = await UserModel.findById(userId);
  if (!user) throw new Error("Пользователь не найден");

  if (!user.favorites.length) return [];

  const favoriteCourses = await CourseModel.find({
    _id: { $in: user.favorites },
  });

  return favoriteCourses;
};
const getAllUsers = async () => {
  return await UserModel.find();
};

export const authService = {
  registerUser,
  generateToken,
  loginUser,
  getUserData,
  deleteUser,
  addToFavorite,
  removeFromFavorites,
  getFavoriteCourses,
  getAllUsers,
};
