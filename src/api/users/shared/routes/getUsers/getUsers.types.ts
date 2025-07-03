import { TEndUserWithoutMasterEnums } from "../../../../../constants/globalEnums";
import { ID } from "../../../../../types/BaseEntity";
import { GetUsersValidation } from "./getUsers.validation";

export type GetUsersRouteConfig = GetUsersValidation & { files: never };
export type GetUsersResponse = {
  type: TEndUserWithoutMasterEnums;
  fullName: string;
  newId: string;
  _id: ID;
}[];
