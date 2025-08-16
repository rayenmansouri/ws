import { Organization } from "../../feature/organization-magement/domain/organization.entity";
import { RandomUtils } from "../../helpers/RandomUtils";
import { FileDetails, FileManager, FileUploadPayload } from "./FileManager";
import { ENVIRONMENT_ENUM } from "../../helpers/constants";
import { BadRequestError } from "../ApplicationErrors";

describe("File Manager", () => {
  let fileManager: FileManager;
  let mockGenerateRandomUUID: jest.Mock;
  let mockBaseUploadFile: jest.Mock;
  let mockbaseBatchUploadFiles: jest.Mock;
  const UUID = "550e8400-e29b-41d4-a716-446655440000";
  const filePayload: FileUploadPayload = {
    name: "avatar.jpg",
    mimetype: "image/jpeg",
    buffer: Buffer.from(""),
  };
  const filePath = "students/avatar";
  const mockOrganization = { subdomain: "test" } as Organization;
  const fileLink = "https://cdn.webschool.tn/avatar/23431.jpg";

  beforeEach(() => {
    mockBaseUploadFile = jest.fn(() => fileLink);
    mockbaseBatchUploadFiles = jest.fn(() => [{ public_id: UUID, url: fileLink }]);
    mockGenerateRandomUUID = jest.fn(() => UUID);

    class MockRandomUtils extends RandomUtils {
      static generateUUID = mockGenerateRandomUUID;
    }

    class TestFileManager extends FileManager {
      protected baseDeleteFiles = mockBaseUploadFile;
      protected baseUploadFile = mockBaseUploadFile;
      protected baseBatchUploadFiles = mockbaseBatchUploadFiles;
    }

    fileManager = new TestFileManager(mockOrganization, MockRandomUtils);
  });

  describe("format file Name", () => {
    it("Should return the new file name containing the random number and the original extension", () => {
      const fileName = "fileName.txt";

      const newFileName = fileManager.formatFileName(fileName);
      expect(newFileName).toBe(`${UUID}.txt`);
    });

    it("Should throw error when file name doesn't have an extension", () => {
      const fileName = "fileName";

      expect(() => fileManager.formatFileName(fileName)).toThrow(BadRequestError);
    });
  });

  describe("uploadFile", () => {
    it("Should return the correct file details", async () => {
      const fileDetails = await fileManager.uploadFile(filePayload, filePath);

      const expectedFilePath = `/${ENVIRONMENT_ENUM.TEST}/${mockOrganization.subdomain}/${filePath}/${UUID}.jpg`;

      expect(fileDetails.name).toBe(filePayload.name);
      expect(fileDetails.path).toBe(expectedFilePath);
      expect(fileDetails.link).toBe(fileLink);
      expect(fileDetails.uploadedAt).toBeInstanceOf(Date);
    });

    it("Should call the baseUploadFile", async () => {
      await fileManager.uploadFile(filePayload, filePath);

      const expectedFilePath = `/${ENVIRONMENT_ENUM.TEST}/${mockOrganization.subdomain}/${filePath}/${UUID}.jpg`;
      expect(mockBaseUploadFile).toHaveBeenCalledWith(filePayload, expectedFilePath);
    });

    it("Should throw error when file doesn't have an extension", async () => {
      try {
        await fileManager.uploadFile({ ...filePayload, name: "file" }, filePath);
        fail("it should throw");
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestError);
      }
    });
  });

  describe("handelEditFile", () => {
    it("should return the same file when no files deleted and no new files", async () => {
      const currentFiles: FileDetails[] = [
        {
          name: "file1.jpg",
          link: "https://example.com/file1.jpg",
          path: "path/file1.jpg",
          uploadedAt: new Date(),
          size: 123,
          mimeType: "jpeg",
        },
      ];

      const result = await fileManager.handelEditFile({ currentFiles, filePath: "admin" });
      expect(result).toEqual(currentFiles);
    });

    it("should remove the deleted file from currentFiles", async () => {
      const currentFiles: FileDetails[] = [
        {
          name: "file1.jpg",
          link: "https://example.com/file1.jpg",
          path: "path/file1.jpg",
          uploadedAt: new Date(),
          size: 123,
          mimeType: "jpeg",
        },

        {
          name: "file2.jpg",
          link: "https://example.com/file2.jpg",
          path: "path/file2.jpg",
          uploadedAt: new Date(),
          size: 123,
          mimeType: "jpeg",
        },
      ];

      const result = await fileManager.handelEditFile({
        currentFiles,
        filesPathToBeDeleted: ["path/file1.jpg"],
        filePath: "admin",
      });

      expect(result).toEqual([
        {
          name: "file2.jpg",
          link: "https://example.com/file2.jpg",
          path: "path/file2.jpg",
          uploadedAt: expect.any(Date),
          size: 123,
          type: "jpeg",
        },
      ]);
    });

    it("should upload new files", async () => {
      const newFiles: FileUploadPayload[] = [
        {
          name: "file1.jpg",
          mimetype: "image/jpeg",
          buffer: Buffer.from(""),
        },
      ];

      const result = await fileManager.handelEditFile({
        currentFiles: [],
        filesPathToBeDeleted: [],
        filePath: "admin",
        newFiles,
      });

      expect(result).toEqual([
        {
          link: fileLink,
          name: "file1.jpg",
          path: expect.any(String),
          uploadedAt: expect.any(Date),
          size: 123,
          type: "jpeg",
        },
      ]);
    });
  });
});
