import { FilesInRequest } from "../../../../../types/app-request";
import { UpdateSignatureValidation } from "./updateSignature.validation";

export type UpdateSignatureRouteConfig = UpdateSignatureValidation & {
  files: FilesInRequest<"image">;
};
export type UpdateSignatureResponse = void;
