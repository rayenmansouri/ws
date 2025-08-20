import { TypedRequest } from "../../../core/express/types";
import { FileDetails } from "../../../core/fileManager/FileManager";

export type UploadAvatarRouteConfig = TypedRequest & {
  files: { avatar: Express.Multer.File[] };
};

export type UploadAvatarResponse = FileDetails;
