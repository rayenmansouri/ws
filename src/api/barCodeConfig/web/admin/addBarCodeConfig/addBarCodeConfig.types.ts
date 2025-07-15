import { AddBarCodeConfigValidation } from "./addBarCodeConfig.validation";

export type AddBarCodeConfigRouteConfig = AddBarCodeConfigValidation & { files: never };
export type AddBarCodeConfigResponse = void;
