import { ForgetPasswordValidation } from "./forget-password.validation";

export type ForgetPasswordRouteConfig = ForgetPasswordValidation & { files: never };
export type ForgetPasswordResponse = {
  email: string;
};
