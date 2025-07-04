import { FileDetails } from "./FileManager";
import { FileDTO } from "../../core/valueObjects/File.vo";

export class FileMapper {
  static toFileDTO(file: FileDetails): FileDTO {
    return {
      path: file.path,
      name: file.name,
      mimetype: file.mimeType,
      sizeInByte: file.size ?? 0,
      url: file.link,
      uploadedAt: file.uploadedAt,
    };
  }
}
