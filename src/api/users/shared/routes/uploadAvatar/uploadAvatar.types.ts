import { FilesInRequest } from "../../../../../types/app-request";
import { UploadAvatarValidation } from "./uploadAvatar.validation";

export type UploadAvatarRouteConfig = UploadAvatarValidation & { files: FilesInRequest<"avatar"> };
export type UploadAvatarResponse = void;
