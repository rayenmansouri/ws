import { BaseRepo } from "../../../core/BaseRepo";
import { Populate } from "../../../core/populateTypes";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ListOptions } from "../../../types/types";
import { SectionMetaData, Section } from "../domain/section.entity";

export abstract class SectionRepo extends BaseRepo<SectionMetaData> {
  abstract listSections<FieldsToPopulate extends keyof SectionMetaData["populatedFields"] = never>(
    filter: { search?: string },
    options: ListOptions & { populate?: FieldsToPopulate[] },
  ): Promise<ResponseWithPagination<Populate<SectionMetaData, FieldsToPopulate>>>;

  abstract findManyBySubLevel(subLevelId: string): Promise<Section[]>;
}
