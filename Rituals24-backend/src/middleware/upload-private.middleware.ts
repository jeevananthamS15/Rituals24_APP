import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
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

// Fields that should be publicly accessible
const PUBLIC_FIELDS = new Set(["profile_photo"]);

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only image or PDF files are allowed"));
  }
};

// Single multer instance that handles both public and private fields:
//   profile_photo  → uploads/rituals24/  + acl: public-read  (visible on the website)
//   sensitive docs → uploads/rituals24/docs/  + acl: private  (presigned URLs only)
const panditUpload = multer({
  storage: multerS3({
    s3,
    bucket: env.AWS_BUCKET_NAME,
    acl: (_req, file, cb) => {
      cb(null, PUBLIC_FIELDS.has(file.fieldname) ? "public-read" : "private");
    },
    key: (_req, file, cb) => {
      const folder = PUBLIC_FIELDS.has(file.fieldname)
        ? "uploads/rituals24"
        : "uploads/rituals24/docs";
      cb(null, `${folder}/${Date.now()}-${file.originalname}`);
    },
  }),
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

export const uploadPanditDocs = panditUpload.fields([
  { name: "profile_photo", maxCount: 1 },
  { name: "govt_ID", maxCount: 1 },
  { name: "address_proof", maxCount: 1 },
  { name: "gurukul_certification", maxCount: 1 },
  { name: "temple_affiliation_proof", maxCount: 1 },
  { name: "bank_proof", maxCount: 1 },
]);

// Generate a presigned URL for a private S3 object (expires in 15 minutes)
export async function generatePresignedUrl(
  key: string,
  expiresIn = 900,
): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: env.AWS_BUCKET_NAME,
    Key: key,
  });
  return getSignedUrl(s3, command, { expiresIn });
}

// Extract the S3 key from a full S3 URL (strips the bucket hostname)
export function extractS3Key(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.pathname.slice(1); // remove leading /
  } catch {
    return url;
  }
}
