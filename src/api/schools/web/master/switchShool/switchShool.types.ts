import { SwitchShoolValidation } from "./switchShool.validation";

export type SwitchShoolRouteConfig = SwitchShoolValidation & { files: never };
export type SwitchShoolResponse = {
  token: string;
};
