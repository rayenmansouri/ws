import { TypedRequest } from "../../../core/express/types";

export type UploadAvatarRouteConfig = TypedRequest & {
  files: { avatar: Express.Multer.File[] };
};

export type UploadAvatarResponse = void;
