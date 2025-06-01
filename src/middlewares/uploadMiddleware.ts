import { Request, Response, NextFunction } from "express";
import multer, { diskStorage } from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs/promises";
import { createCanvas } from "canvas";

const uploadDir = path.join(__dirname, "../../uploads");
const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = file.originalname.split(".").pop();
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + ext);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Неверный формат файла"));
  }
};

export const upload = multer({ storage, fileFilter });

export const Image = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const imageName = req.body.image;

    if (!imageName) {
      res.status(400).json({ error: "Поле 'image' обязательно" });
      return;
    }

    const filePath = path.join(uploadDir, imageName);
    const outputPath = path.join(uploadDir, "processed-" + imageName);

    await fs.access(filePath).catch(() => {
      throw new Error("Файл не найден");
    });

    const watermarkCanvas = createCanvas(300, 50);
    const ctx = watermarkCanvas.getContext("2d");
    ctx.font = "bold 24px sans-serif";
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillText("Водяной знак", 10, 30);
    const watermarkBuffer = watermarkCanvas.toBuffer();

    const image = sharp(filePath);
    const metadata = await image.metadata();
    const width = metadata.width ?? 1024;

    await image
      .resize({ width: Math.min(width, 1024) })
      .composite([{ input: watermarkBuffer, gravity: "southeast" }])
      .jpeg({ quality: 80 })
      .toFile(outputPath);

    res.status(200).json({
      message: "Обработка завершена",
      filename: "processed-" + imageName,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка обработки или файл не найден", err });
    next(err);
  }
};
