import { BaseRepo } from "../../../core/BaseRepo";
import { Populate } from "../../../core/populateTypes";
import { ID } from "../../../types/BaseEntity";
import { TeacherProfileMetaData } from "../domain/teacherProfile.entity";

export abstract class TeacherProfileRepo extends BaseRepo<TeacherProfileMetaData> {
  abstract getTeacherProfilesBySchoolYears<
    FieldsToPopulate extends keyof TeacherProfileMetaData["populatedFields"] = never,
  >(
    teacherId: ID,
    schoolYearId: ID[],
    options?: {
      populate?: FieldsToPopulate[];
    },
  ): Promise<Populate<TeacherProfileMetaData, FieldsToPopulate>[]>;

  abstract removeClass(teacherId: ID, classId: ID): Promise<void>;

  abstract getManyTeacherProfilesByCurrentSchoolYears<
    FieldsToPopulate extends keyof TeacherProfileMetaData["populatedFields"] = never,
  >(
    teacherId: ID[],
    schoolYearId: ID[],
    options?: {
      populate?: FieldsToPopulate[];
    },
  ): Promise<Populate<TeacherProfileMetaData, FieldsToPopulate>[]>;

  abstract addGroup(teacherProfilesIds: ID[], groupId: ID): Promise<void>;
  abstract getAllProfilesOfTeacher(teacherId: ID): Promise<TeacherProfileMetaData["entity"][]>;
}
