import { SwitchToUserValidation } from "./switchToUser.validation";

export type SwitchToUserRouteConfig = SwitchToUserValidation & { files: never };

export type SwitchToUserResponse = {
  token: string;
};
