import { BaseRepo } from "../../../core/BaseRepo";
import { Populate } from "../../../core/populateTypes";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ID } from "../../../types/BaseEntity";
import { ListOptions } from "../../../types/types";
import { Class, ClassMetaData } from "./class.entity";

export abstract class ClassRepo extends BaseRepo<ClassMetaData> {
  abstract listClasses(
    filter: { search?: string; classType?: ID[]; schoolYears?: ID[] },
    options?: ListOptions,
  ): Promise<ResponseWithPagination<Class>>;

  abstract find(filter: { search?: string }, options?: { limit: number }): Promise<Class[]>;

  abstract incompleteTerm(classId: ID, termId: ID): Promise<void>;

  abstract completeTerm(classId: ID, termId: ID): Promise<void>;

  abstract removeSubject(classIds: ID[], subjectId: ID): Promise<void>;

  abstract removeSubSubject(classIds: ID[], subSubjectId: ID): Promise<void>;

  abstract findByName(className: string): Promise<ClassMetaData["entity"] | null>;

  abstract findGeneratedTermByClassTypeInSchoolYear(
    classTypeId: ID,
    schoolYearId: ID,
  ): Promise<ClassMetaData["entity"] | null>;

  abstract findManyByClassTypeInSchoolYear(
    classTypeId: ID,
    schoolYearId: ID,
  ): Promise<ClassMetaData["entity"][]>;

  abstract findManyByClassType(classTypeId: ID): Promise<ClassMetaData["entity"][]>;

  abstract findManyByClassTypes(classTypeId: ID[]): Promise<ClassMetaData["entity"][]>;

  abstract addSubjectType(classTypeId: ID, subjectType: ID): Promise<void>;

  abstract findOneByPreferredClassroom(classroomId: ID): Promise<ClassMetaData["entity"] | null>;

  abstract findBySchoolYearIds<
    FieldsToPopulate extends keyof ClassMetaData["populatedFields"] = never,
  >(
    schoolYearIds: ID[],
    options?: {
      populate?: FieldsToPopulate[];
    },
  ): Promise<Populate<ClassMetaData, FieldsToPopulate>[]>;

  abstract switchStudentClass(studentId: ID, from: ID, to: ID): Promise<void>;
  abstract getManyByStudents(
    studentIds: ID[],
    schoolYear: ID[],
  ): Promise<ClassMetaData["entity"][]>;

  abstract getClassesCountOfSchoolYear(schoolYearsIds: ID[]): Promise<ClassMetaData["entity"][]>;

  abstract getClassesCountOfSchoolYearAndClassTypes(
    schoolYearId: ID,
    classTypes: ID[],
  ): Promise<number>;

  abstract publishTerm(classId: ID, termId: ID): Promise<void>;

  abstract hideTerm(classId: ID, termId: ID): Promise<void>;

  abstract resetNotAvailableTimesForAllClasses(): Promise<void>;

  abstract ensureNameIsUniqueInSchoolYear(name: string, schoolYearId: ID): Promise<void>;
}
