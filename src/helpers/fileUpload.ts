import { getCurrentTimeOfSchool } from "../core/getCurrentTimeOfSchool";
import { InternalError } from "../core/ApplicationErrors";
import { File } from "../types/app-request";
import { generateUniquePath } from "./upload";
import iconv from "iconv-lite";
import { IFile } from "../feature/sessionManagement/domain/session.entity";
import path from "path";
import { ALLOWED_VIDEO_EXTENSIONS } from "./constants";

export class FileUpload {
  static getMediaFiles(files: File[]): File[] {
    const mediaFiles = files.filter(file => this.isMediaFile(file.mimetype));
    return mediaFiles;
  }

  static removeMediaFiles(files: File[]): File[] {
    const mediaFiles = files.filter(file => !this.isMediaFile(file.mimetype));
    return mediaFiles;
  }

  static isMediaFile(fileMimetype: string): boolean {
    return this.isImageFile(fileMimetype) || this.isVideoFile(fileMimetype);
  }

  static isImageFile(fileMimetype: string): boolean {
    return fileMimetype.startsWith("image");
  }

  static isVideoFile(fileMimetype: string): boolean {
    return (
      fileMimetype.startsWith("video") ||
      // mimeType of stored file in the database (not start with "video")
      ALLOWED_VIDEO_EXTENSIONS.some(ext => fileMimetype.includes(ext))
    );
  }

  static generateFilePaths(
    files: Pick<File, "originalname">[],
    tenantId: string,
    folderName: string,
  ): string[] {
    const paths: string[] = [];

    files.forEach(file => {
      const uniquePath = generateUniquePath(file, tenantId, folderName);
      paths.push(uniquePath);
    });

    return paths;
  }

  static formatFileOriginalname(originalname: string): string {
    return iconv.decode(Buffer.from(originalname, "latin1"), "utf8");
  }
  static formatUploadedFile(
    fileBeforeUpload: File[],
    uploadedFile: { public_id: string; url: string }[],
    tenantId: string,
  ): IFile[] {
    if (fileBeforeUpload.length !== uploadedFile.length)
      throw new InternalError("Some File did not uploaded");

    return uploadedFile.map((file, index) => ({
      name: this.formatFileOriginalname(fileBeforeUpload[index].originalname),
      public_id: file.public_id,
      url: file.url,
      date: getCurrentTimeOfSchool(tenantId),
      size: fileBeforeUpload[index].buffer.byteLength,
      mimeType: path.extname(fileBeforeUpload[index].originalname).replace(".", ""),
    }));
  }
}
