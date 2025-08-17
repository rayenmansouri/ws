import { TypedRequestOptions } from "../../core/express/types";

export type UploadAvatarRouteConfig = TypedRequestOptions & {
  files: { avatar: Express.Multer.File[] };
};

export type UploadAvatarResponse = void;
