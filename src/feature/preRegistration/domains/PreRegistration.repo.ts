import { BaseRepo } from "../../../core/BaseRepo";
import { Populate } from "../../../core/populateTypes";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ID } from "../../../types/BaseEntity";
import { ListOptions } from "../../../types/types";
import { PreRegistrationMetaData } from "./preRegistration.entity";

export abstract class PreRegistrationRepo extends BaseRepo<PreRegistrationMetaData> {
  abstract listPreRegistrations(
    filter: {
      search?: string;
      level?: ID;
      status?: string;
      isRegistered?: boolean;
    },
    options?: ListOptions,
  ): Promise<ResponseWithPagination<Populate<PreRegistrationMetaData, "level" | "classType">>>;

  abstract findManyByClassType(classTypeId: ID): Promise<PreRegistrationMetaData["entity"][]>;
  abstract findManyByLevel(levelId: ID): Promise<PreRegistrationMetaData["entity"][]>;

  abstract addEmptyOne(): Promise<PreRegistrationMetaData["entity"]>;
}
