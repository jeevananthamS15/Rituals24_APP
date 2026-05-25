import { S3Client } from "@aws-sdk/client-s3";
import multer, { FileFilterCallback } from "multer";
import multerS3 from "multer-s3";
import { Request } from "express";
import { env } from "../config/env";

const s3 = new S3Client({
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY,
    secretAccessKey: env.AWS_SECRET_KEY,
  },
  region: env.AWS_REGION,
});

const imageFileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"));
  }
};

const upload = multer({
  storage: multerS3({
    s3,
    bucket: env.AWS_BUCKET_NAME,
    acl: "public-read",
    key: (_req, file, cb) => {
      const fileKey = `uploads/rituals24/${Date.now()}-${file.originalname}`;
      cb(null, fileKey);
    },
  }),
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB per file
  },
});

// Use for routes that accept multiple images (up to 10)
export const uploadImages = upload.array("images", 10);

// Use for routes that accept a single image
export const uploadSingleImage = upload.single("image");
