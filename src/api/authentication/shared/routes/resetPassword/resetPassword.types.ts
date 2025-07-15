import { ResetPasswordValidation } from "./resetPassword.validation";

export type ResetPasswordRouteConfig = ResetPasswordValidation & { files: never };
export type ResetPasswordResponse = { token: string };
