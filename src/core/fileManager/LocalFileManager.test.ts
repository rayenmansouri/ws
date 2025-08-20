import { Organization } from "../../feature/organization-magement/domain/organization.entity";
import { RandomUtils } from "../../helpers/RandomUtils";
import { FileUploadPayload } from "./FileManager";
import { LocalFileManager } from "./LocalFileManager";
import fs from "fs/promises";
import path from "path";

// Mock fs module
jest.mock("fs/promises");
const mockedFs = fs as jest.Mocked<typeof fs>;

describe("LocalFileManager", () => {
  let localFileManager: LocalFileManager;
  let mockOrganization: Organization;
  let mockRandomUtils: typeof RandomUtils;

  const filePayload: FileUploadPayload = {
    name: "avatar.jpg",
    mimetype: "image/jpeg",
    buffer: Buffer.from("test image data"),
  };

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    mockOrganization = { subdomain: "test-org" } as Organization;
    mockRandomUtils = RandomUtils;
    
    localFileManager = new LocalFileManager(mockOrganization, mockRandomUtils);
  });

  describe("baseUploadFile", () => {
    it("should create directory and write file to local filesystem", async () => {
      const filePath = "students/avatars/user123";
      const expectedDirPath = path.join(process.cwd(), "uploads", filePath);
      const expectedFilePath = path.join(expectedDirPath, "user123");
      const expectedUrl = `/uploads/${filePath}/user123`;

      // Mock fs.mkdir to succeed
      mockedFs.mkdir.mockResolvedValue(undefined);
      // Mock fs.writeFile to succeed
      mockedFs.writeFile.mockResolvedValue(undefined);

      const result = await localFileManager["baseUploadFile"](filePayload, filePath);

      expect(mockedFs.mkdir).toHaveBeenCalledWith(expectedDirPath, { recursive: true });
      expect(mockedFs.writeFile).toHaveBeenCalledWith(expectedFilePath, filePayload.buffer);
      expect(result).toBe(expectedUrl);
    });

    it("should handle file paths with different separators correctly", async () => {
      const filePath = "students\\avatars\\user123";
      const expectedDirPath = path.join(process.cwd(), "uploads", filePath);
      const expectedFilePath = path.join(expectedDirPath, "user123");

      mockedFs.mkdir.mockResolvedValue(undefined);
      mockedFs.writeFile.mockResolvedValue(undefined);

      await localFileManager["baseUploadFile"](filePayload, filePath);

      expect(mockedFs.mkdir).toHaveBeenCalledWith(expectedDirPath, { recursive: true });
      expect(mockedFs.writeFile).toHaveBeenCalledWith(expectedFilePath, filePayload.buffer);
    });
  });

  describe("baseBatchUploadFiles", () => {
    it("should upload multiple files and return FileDetails array", async () => {
      const filePayloads = [filePayload, { ...filePayload, name: "avatar2.png" }];
      const paths = ["students/avatars/user1", "students/avatars/user2"];

      // Mock the baseUploadFile method
      const mockBaseUploadFile = jest.spyOn(localFileManager as any, "baseUploadFile");
      mockBaseUploadFile.mockResolvedValue("/uploads/students/avatars/user1/avatar.jpg");

      const result = await localFileManager["baseBatchUploadFiles"](filePayloads, paths);

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe("avatar.jpg");
      expect(result[1].name).toBe("avatar2.png");
      expect(mockBaseUploadFile).toHaveBeenCalledTimes(2);
    });
  });

  describe("baseDeleteFiles", () => {
    it("should delete files from local filesystem", async () => {
      const filePaths = ["/uploads/students/avatars/user1/avatar.jpg"];
      const expectedLocalPath = path.join(process.cwd(), "uploads/students/avatars/user1/avatar.jpg");

      mockedFs.unlink.mockResolvedValue(undefined);

      await localFileManager["baseDeleteFiles"](filePaths);

      expect(mockedFs.unlink).toHaveBeenCalledWith(expectedLocalPath);
    });

    it("should handle file not found gracefully", async () => {
      const filePaths = ["/uploads/nonexistent/file.jpg"];
      const expectedLocalPath = path.join(process.cwd(), "uploads/nonexistent/file.jpg");

      const error = new Error("ENOENT: no such file or directory") as NodeJS.ErrnoException;
      error.code = "ENOENT";
      mockedFs.unlink.mockRejectedValue(error);

      // Should not throw error
      await expect(localFileManager["baseDeleteFiles"](filePaths)).resolves.not.toThrow();
      expect(mockedFs.unlink).toHaveBeenCalledWith(expectedLocalPath);
    });

    it("should throw error for other file system errors", async () => {
      const filePaths = ["/uploads/students/avatars/user1/avatar.jpg"];
      const expectedLocalPath = path.join(process.cwd(), "uploads/students/avatars/user1/avatar.jpg");

      const error = new Error("Permission denied") as NodeJS.ErrnoException;
      error.code = "EACCES";
      mockedFs.unlink.mockRejectedValue(error);

      await expect(localFileManager["baseDeleteFiles"](filePaths)).rejects.toThrow("Permission denied");
      expect(mockedFs.unlink).toHaveBeenCalledWith(expectedLocalPath);
    });
  });
});
