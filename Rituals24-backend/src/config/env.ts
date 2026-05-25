import dotenv from "dotenv";

dotenv.config();

function requiredEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

export const env = {
  PORT: process.env.PORT || "4000",
  MONGO_URL: requiredEnv("MONGO_URI"),
  JWT_SECRET: requiredEnv("JWT_SECRET"),
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
  AWS_ACCESS_KEY: requiredEnv("AWS_ACCESS_KEY"),
  AWS_SECRET_KEY: requiredEnv("AWS_SECRET_KEY"),
  AWS_REGION: process.env.AWS_REGION ?? "ap-south-1",
  AWS_BUCKET_NAME: requiredEnv("AWS_BUCKET_NAME"),
};
