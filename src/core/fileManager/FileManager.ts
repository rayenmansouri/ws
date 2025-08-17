import { injectable } from "inversify";
import path from "path";
import { environment } from "../../config";
import { deleteSpaces } from "../../helpers/functions";
import { getVideoDurationFromBuffer } from "../../helpers/getVideoDuration";
import { RandomUtils } from "../../helpers/RandomUtils";
import { BadRequestError, InternalError } from "../ApplicationErrors";
import { inject } from "../container/TypedContainer";
import logger from "../Logger";
import { StringUtils } from "./../../helpers/StringUtils";
import { FileUpload } from "../../helpers/fileUpload";
import { fixArabicLetter } from "../../helpers/fixArabicLetter";
import { Organization } from "../../feature/organization-magement/domain/organization.entity";
import { container } from "../container/container";
import { DatabaseService } from "../database/database.service";

export type FileUploadPayload = {
  name: string;
  mimetype: string;
  buffer: Buffer;
};

export type FileDetails = {
  name: string;
  link: string;
  path: string;
  uploadedAt: Date;
  size: number | null;
  mimeType: string;
};

export type VideoDetails = FileDetails & {
  durationInSeconds: number;
};

@injectable()
export abstract class FileManager {
  private tenantName: string;

  constructor(
    @inject("Organization") school: Organization,
    @inject("RandomUtils") private randomUtils: typeof RandomUtils,
  ) {
    this.tenantName = school.subdomain;
  }

  protected abstract baseUploadFile(
    filePayload: FileUploadPayload,
    filePath: string,
  ): Promise<string>;

  protected abstract baseBatchUploadFiles(
    pdfBuffers: FileUploadPayload[],
    paths: string[],
  ): Promise<FileDetails[]>;

  async uploadFile(filePayload: FileUploadPayload, filePath: string): Promise<FileDetails> {
    const pathFileName = this.formatFileName(filePayload.name);

    const fullFilePath = this.generateFullFilePath(filePath, pathFileName);

    const fileLink = await this.baseUploadFile(filePayload, fullFilePath);

    const fileDetails: FileDetails = {
      name: fixArabicLetter(filePayload.name),
      link: fileLink,
      path: fullFilePath,
      uploadedAt: new Date(),
      size: filePayload.buffer.byteLength,
      mimeType: path.extname(filePayload.name).replace(".", ""),
    };

    return fileDetails;
  }

  private generateFullFilePath(filePath: string, pathFileName: string): string {
    return `/${environment}/${this.tenantName}/${filePath}/${pathFileName}`;
  }

  async uploadFiles(filesPayload: FileUploadPayload[], paths: string[]): Promise<FileDetails[]> {
    if (filesPayload.length !== paths.length) {
      throw new InternalError("The number of files and paths must match.");
    }

    if (filesPayload.length > 0) {
      const uploadedFiles = await this.baseBatchUploadFiles(filesPayload, paths);

      return uploadedFiles.map((file, i) => ({
        name: fixArabicLetter(filesPayload[i].name),
        link: file.link,
        path: file.path,
        uploadedAt: new Date(),
        size: filesPayload[i].buffer.byteLength,
        mimeType: path.extname(filesPayload[i].name).replace(".", ""),
      }));
    }
    return [];
  }

  async uploadVideosFile(
    filePayload: FileUploadPayload[],
    filePath: string,
    tenantId: string,
  ): Promise<VideoDetails[]> {
    const isEveryFileVideo = filePayload.every(file => FileUpload.isVideoFile(file.mimetype));

    if (!isEveryFileVideo) throw new InternalError("Not all files are videos");

    const filePaths = FileManager.generateFilePaths(filePayload, tenantId, filePath);
    const uploadedVideo = await this.uploadFiles(filePayload, filePaths);
    const videoDurationsPromise = filePayload.map(file => getVideoDurationFromBuffer(file.buffer));
    const videoDurations = await Promise.all(videoDurationsPromise);
    return uploadedVideo.map((video, i) => ({
      ...video,
      durationInSeconds: videoDurations[i],
    }));
  }

  public formatFileName(fileName: string): string {
    const lastDotIndex = fileName.lastIndexOf(".");

    if (lastDotIndex === -1) throw new BadRequestError("global.unsupportedFile");

    const fileExtension = fileName.slice(lastDotIndex);

    const UUID = this.randomUtils.generateUUID();

    return `${UUID}${fileExtension}`;
  }

  protected abstract baseDeleteFiles(filePath: string[]): Promise<void>;

  public async deleteFiles(filePath: string[]): Promise<void> {
    try {
      await this.baseDeleteFiles(filePath);
    } catch (error) {
      logger.warn("Error deleting files", error);
    }
  }

  public async handelEditFile(data: {
    currentFiles: FileDetails[];
    filePath: string;
    filesPathToBeDeleted?: string[];
    newFiles?: FileUploadPayload[];
  }): Promise<FileDetails[]> {
    const { currentFiles, filePath, filesPathToBeDeleted, newFiles } = data;

    if (filesPathToBeDeleted) {
      await this.deleteFiles(filesPathToBeDeleted);
    }

    let filesToBeAdded: Awaited<ReturnType<typeof this.uploadFiles>> = [];
    let uploadedFiles: FileDetails[] = [];
    if (newFiles && newFiles.length) {
      const paths = newFiles.map(file => {
        const subFilePath = this.formatFileName(file.name);
        return this.generateFullFilePath(filePath, subFilePath);
      });

      uploadedFiles = await this.uploadFiles(newFiles, paths);
    }

    filesToBeAdded = uploadedFiles.map((file, i) => ({
      link: file.link,
      name: newFiles![i].name,
      path: file.path,
      uploadedAt: new Date(),
      size: newFiles![i].buffer.byteLength,
      mimeType: path.extname(newFiles![i].name).replace(".", ""),
    }));

    const remainingFiles = currentFiles.filter(
      file => !(filesPathToBeDeleted || []).includes(file.path),
    );

    return [...remainingFiles, ...filesToBeAdded];
  }
  static getMediaFiles(files: FileUploadPayload[]): FileUploadPayload[] {
    const mediaFiles = files.filter(file => this.isMediaFile(file.mimetype));
    return mediaFiles;
  }

  static removeMediaFiles(files: FileUploadPayload[]): FileUploadPayload[] {
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
    return fileMimetype.startsWith("video");
  }

  static generateFilePaths(
    files: FileUploadPayload[],
    tenantId: string,
    folderName: string,
  ): string[] {
    const paths: string[] = [];

    files.forEach(file => {
      const uniquePath = this.generateUniquePath(file.name, tenantId, folderName);
      paths.push(uniquePath);
    });

    return paths;
  }

  static generateUniquePath = (fileName: string, tenantId: string, folderName: string): string => {
    const dbService = container.get<DatabaseService>("DBService");
    const schoolSubdomain = dbService.getOrganization(tenantId)?.subdomain;
    const originalname = StringUtils.removeArabicLetters(fileName);
    const extension = originalname.split(".").pop();
    const randomSuffix = `${new Date().getTime()}${Math.random() * 10000}`;
    const lastDotIndex = originalname.lastIndexOf(".");
    const newNameWithExtension = `${originalname.slice(
      0,
      lastDotIndex,
    )}_${randomSuffix}.${extension}`;

    const path = deleteSpaces(
      `/${environment}/${schoolSubdomain}/${folderName}/${newNameWithExtension}`,
    );

    return path;
  };

  public async handelEditVideo(data: {
    currentFiles: VideoDetails[];
    filePath: string;
    tenantId: string;
    filesPathToBeDeleted?: string[];
    newFiles?: FileUploadPayload[];
  }): Promise<VideoDetails[]> {
    const { currentFiles, filePath, filesPathToBeDeleted, newFiles } = data;

    if (filesPathToBeDeleted) {
      await this.deleteFiles(filesPathToBeDeleted);
    }

    let filesToBeAdded: Awaited<ReturnType<typeof this.uploadVideosFile>> = [];
    if (newFiles && newFiles.length) {
      filesToBeAdded = await this.uploadVideosFile(newFiles, filePath, data.tenantId);
    }

    const remainingFiles = currentFiles.filter(
      file => !(filesPathToBeDeleted || []).includes(file.path),
    );

    return [...remainingFiles, ...filesToBeAdded];
  }
}
