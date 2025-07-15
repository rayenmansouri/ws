import { DeleteSignatureValidation } from "./deleteSignature.validation";

export type DeleteSignatureRouteConfig = DeleteSignatureValidation & { files: never };
export type DeleteSignatureResponse = void;
