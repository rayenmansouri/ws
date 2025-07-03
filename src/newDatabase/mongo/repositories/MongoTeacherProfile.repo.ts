import { ClientSession, Connection } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { TeacherProfileMetaData } from "../../../feature/teachers/domain/teacherProfile.entity";
import { TeacherProfileRepo } from "../../../feature/teachers/domain/TeacherProfile.repo";
import { MongoBaseRepo } from "./MongoBase.repo";
import { ID } from "../../../types/BaseEntity";
import { Populate } from "../../../core/populateTypes";

export class MongoTeacherProfileRepo
  extends MongoBaseRepo<TeacherProfileMetaData>
  implements TeacherProfileRepo
{
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "teacherProfile", session);
  }

  async removeClass(teacherId: ID, classId: ID): Promise<void> {
    await this.model.updateMany(
      { teacher: teacherId, classes: classId },
      { $pull: { classes: classId } },
      { session: this.session || null },
    );
  }

  async getManyTeacherProfilesByCurrentSchoolYears<
    FieldsToPopulate extends keyof TeacherProfileMetaData["populatedFields"] = never,
  >(
    teacherId: ID[],
    schoolYearId: ID[],
    options?: { populate?: FieldsToPopulate[] },
  ): Promise<Populate<TeacherProfileMetaData, FieldsToPopulate>[]> {
    const query = this.model.find({
      teacher: { $in: teacherId },
      schoolYear: { $in: schoolYearId },
    });

    if (this.session) query.session(this.session);

    if (options?.populate) query.populate(options?.populate as string[]);

    const entity = await query;
    return entity as unknown as Populate<TeacherProfileMetaData, FieldsToPopulate>[];
  }

  async addGroup(teacherProfilesIds: ID[], groupId: ID): Promise<void> {
    await this.model.updateMany(
      { _id: { $in: teacherProfilesIds } },
      { $addToSet: { groups: groupId } },
      { session: this.session || null },
    );
  }

  async getTeacherProfilesBySchoolYears<
    FieldsToPopulate extends keyof TeacherProfileMetaData["populatedFields"] = never,
  >(
    teacherId: ID,
    schoolYearIds: ID[],
    options?: { populate?: FieldsToPopulate[] },
  ): Promise<Populate<TeacherProfileMetaData, FieldsToPopulate>[]> {
    const query = this.model.find({ teacher: teacherId, schoolYear: { $in: schoolYearIds } });

    if (this.session) query.session(this.session);

    if (options?.populate) query.populate(options?.populate as string[]);

    const entity = await query;
    return entity as unknown as Populate<TeacherProfileMetaData, FieldsToPopulate>[];
  }

  async getAllProfilesOfTeacher(teacherId: ID): Promise<TeacherProfileMetaData["entity"][]> {
    return this.model.find({
      teacher: teacherId,
    });
  }
}
