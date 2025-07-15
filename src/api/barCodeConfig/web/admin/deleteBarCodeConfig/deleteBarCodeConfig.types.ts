import { DeleteBarCodeConfigValidation } from "./deleteBarCodeConfig.validation";

export type DeleteBarCodeConfigRouteConfig = DeleteBarCodeConfigValidation & { files: never };
export type DeleteBarCodeConfigResponse = void;
