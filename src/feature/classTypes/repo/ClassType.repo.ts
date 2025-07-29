import { BaseRepo } from "../../../core/BaseRepo";
import { Populate } from "../../../core/populateTypes";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ID } from "../../../types/BaseEntity";
import { ListOptions } from "../../../types/types";
import { ClassType, ClassTypeMetaData } from "./classType.entity";

export abstract class ClassTypeRepo extends BaseRepo<ClassTypeMetaData> {
  abstract listClassTypes(
    filter: { search?: string; subLevelIds?: ID[]; sectionsIds?: ID[]; classTypeIds?: ID[] },
    options: ListOptions,
  ): Promise<ResponseWithPagination<Populate<ClassTypeMetaData, "subLevel" | "nextClassTypes">>>;

  abstract addSubjectToClassType(classTypeId: ID, data: ClassType["subjects"][0]): Promise<void>;
  abstract findManyGroupedBySubLevel(
    subLevelIds: ID[],
  ): Promise<{ classTypes: ClassType[]; subLevelId: ID }[]>;

  abstract addSubSubjectToClassType(
    classTypeId: ID,
    subjectTypeId: ID,
    data: ClassType["subjects"][0]["subSubjects"][0],
  ): Promise<void>;

  abstract findManyByNextClassType(nextClassTypeId: ID): Promise<ClassTypeMetaData["entity"][]>;

  abstract findManyBySubLevelsAndSection(subLevelIds: ID[], sectionId: ID): Promise<ClassType[]>;

  abstract findManySection(sectionId: ID): Promise<ClassType[]>;

  abstract findManySubLevels(subLevelId: ID[]): Promise<ClassType[]>;

  abstract findManyBySubjectType(subjectTypeId: ID): Promise<ClassType[]>;

  abstract findManyBySubSubjectType(subSubjectTypeId: ID): Promise<ClassType[]>;

  abstract findOneByExamType(examTypeId: ID): Promise<ClassType | null>;

  abstract findManyBySublevels(subLevelsIds: ID[]): Promise<ClassTypeMetaData["entity"][]>;

  abstract addActivityToClassType(
    classTypeId: ID,
    activity: ClassType["activities"][0],
  ): Promise<void>;
}
