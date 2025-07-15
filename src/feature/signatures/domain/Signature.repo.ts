import { BaseRepo } from "../../../core/BaseRepo";
import { Populate } from "../../../core/populateTypes";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ID } from "../../../types/BaseEntity";
import { ListOptions } from "../../../types/types";
import { Signature, SignatureMetaData } from "./signature.entity";

export abstract class SignatureRepo extends BaseRepo<SignatureMetaData> {
  abstract list(
    filter: { search?: string },
    options: ListOptions,
  ): Promise<ResponseWithPagination<Populate<SignatureMetaData, "classTypes">>>;

  abstract findByClassType(classTypeId: ID): Promise<Signature | null>;
}
