import { ForgetPasswordValidation } from "./forgetPassword.validation";

export type ForgetPasswordRouteConfig = ForgetPasswordValidation & { files: never };
export type ForgetPasswordResponse = {
  email: string;
};
