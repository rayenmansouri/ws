import { ResetPasswordValidation } from "./reset-password.validation";

export type ResetPasswordRouteConfig = ResetPasswordValidation & { files: never };
export type ResetPasswordResponse = { token: string };
