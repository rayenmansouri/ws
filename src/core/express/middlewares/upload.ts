import multer, { Field } from "multer";
import { Middleware } from "../types";

export const MAX_FILE_SIZE_IN_MB = 2;
export const MAX_ATTACHEMENT_SIZE_IN_MB = 10;
export const MAX_HOMEWORK_SIZE_IN_MB = 10;
const MB_TO_BYTES = 1000000;

export const upload = multer({
  limits: { fileSize: MAX_FILE_SIZE_IN_MB * MB_TO_BYTES },
});
export const uploadAttachment = multer({
  limits: { fileSize: MAX_ATTACHEMENT_SIZE_IN_MB * MB_TO_BYTES },
});
export const uploadHomeworks = multer({
  limits: { fileSize: MAX_ATTACHEMENT_SIZE_IN_MB * MB_TO_BYTES },
});

export type UploadOptions = {
  fileSizeInMB: number;
};

export const disableUploadMiddleware = multer().none() as Middleware;

export const uploadMiddleware = (fields: Field[], options?: UploadOptions) =>
  multer({
    limits: options && { fileSize: options.fileSizeInMB * MB_TO_BYTES },
  }).fields(fields) as Middleware;
