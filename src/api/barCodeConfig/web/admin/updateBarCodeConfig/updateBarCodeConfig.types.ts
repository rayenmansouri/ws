import { UpdateBarCodeConfigValidation } from "./updateBarCodeConfig.validation";

export type UpdateBarCodeConfigRouteConfig = UpdateBarCodeConfigValidation & { files: never };
export type UpdateBarCodeConfigResponse = void;
