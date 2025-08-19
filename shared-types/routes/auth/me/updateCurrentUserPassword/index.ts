import { ReplaceDatesWithStrings } from "../../../../utils";
import { UpdateCurrentUserPasswordResponse } from "../../../../../src/api-v2/auth/me/updateCurrentUserPassword/updateCurrentUserPassword.types";
import { UpdateCurrentUserPasswordRouteConfig } from "../../../../../src/api-v2/auth/me/updateCurrentUserPassword/updateCurrentUserPassword.types";

export const updateCurrentUserPasswordRoute = {
    path: "/password",
    method: "patch",
    paramsKey: [],
};

export type UpdateCurrentUserPasswordRouteType = ReplaceDatesWithStrings<UpdateCurrentUserPasswordRouteConfig> & {
  response: ReplaceDatesWithStrings<UpdateCurrentUserPasswordResponse>
}
