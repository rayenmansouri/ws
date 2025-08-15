import { UpdateCurrentUserPasswordValidation } from "./updateCurrentUserPassword.validation";


export type UpdateCurrentUserPasswordRouteConfig = UpdateCurrentUserPasswordValidation & { files: never };
export type UpdateCurrentUserPasswordResponse = {
  token: string;
};
