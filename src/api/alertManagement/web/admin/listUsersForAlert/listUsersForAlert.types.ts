import { TEndUserEnum } from "./../../../../../constants/globalEnums";
import { ResponseWithPagination } from "./../../../../../newDatabase/mongo/types";
import { ListUsersForAlertValidation } from "./listUsersForAlert.validation";

export type ListUsersForAlertRouteConfig = ListUsersForAlertValidation & { files: never };

export type ListUsersForAlertResponse = ResponseWithPagination<{
  fullName: string;
  phoneNumber: string | null;
  _id: string;
  avatar: string;
  userType: TEndUserEnum;
}>;
