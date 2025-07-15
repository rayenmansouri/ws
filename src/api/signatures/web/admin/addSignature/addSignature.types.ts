import { FilesInRequest } from "../../../../../types/app-request";
import { AddSignatureValidation } from "./addSignature.validation";

export type AddSignatureRouteConfig = AddSignatureValidation & {
  files: FilesInRequest<"image">;
};
export type AddSignatureResponse = void;
