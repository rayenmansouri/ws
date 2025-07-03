import { injectable } from "inversify";
import { ClientSession, Connection } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import {
  StudentProfile,
  StudentProfileMetaData,
} from "../../../feature/students/domain/studentProfile.entity";
import { StudentProfileRepo } from "../../../feature/students/domain/StudentProfile.repo";
import { MongoBaseRepo } from "./MongoBase.repo";
import { ID } from "../../../types/BaseEntity";
import { NotFoundError } from "../../../core/ApplicationErrors";

@injectable()
export class MongoStudentProfileRepo
  extends MongoBaseRepo<StudentProfileMetaData>
  implements StudentProfileRepo
{
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "studentProfile", session);
  }

  async addGroup(studentProfilesIds: ID[], groupId: ID): Promise<void> {
    await this.model.updateMany(
      { _id: { $in: studentProfilesIds } },
      { $addToSet: { groups: groupId } },
      { session: this.session || null },
    );
  }
  async removeGroup(studentProfilesIds: ID[], groupId: ID): Promise<void> {
    await this.model.updateMany(
      { _id: { $in: studentProfilesIds } },
      { $pull: { groups: groupId } },
      { session: this.session || null },
    );
  }

  async updateManyByStudentsAndSchoolYear(
    studentIds: ID[],
    schoolYearId: ID,
    data: Partial<StudentProfile>,
  ): Promise<void> {
    await this.model
      .updateMany({ student: { $in: studentIds }, schoolYear: schoolYearId }, data)
      .session(this.session || null);
  }

  async getStudentProfileOfSchoolYearOrThrow(
    studentId: ID,
    schoolYearId: ID,
  ): Promise<StudentProfile> {
    const schoolYear = await this.model.findOne({
      student: studentId,
      schoolYear: schoolYearId,
    });

    if (!schoolYear) throw new NotFoundError("global.internalError");

    return schoolYear;
  }

  async getStudentProfileOfSchoolYear(
    studentId: ID,
    schoolYearId: ID,
  ): Promise<StudentProfile | null> {
    return await this.model.findOne({ student: studentId, schoolYear: schoolYearId });
  }

  async getManyStudentProfilesOfSchoolYear(
    studentIds: ID[],
    schoolYearId: ID,
  ): Promise<StudentProfile[]> {
    const schoolYears = await this.model.find({
      student: { $in: studentIds },
      schoolYear: schoolYearId,
    });

    return schoolYears;
  }

  async getManyStudentProfilesOfSchoolYears(
    studentIds: ID[],
    schoolYearIds: ID[],
  ): Promise<StudentProfile[]> {
    const schoolYears = await this.model.find({
      student: { $in: studentIds },
      schoolYear: { $in: schoolYearIds },
    });

    return schoolYears;
  }

  async countStudentsAssignedToClass(schoolYearsIds: ID[], studentsIds: ID[]): Promise<number> {
    return this.model.count({
      schoolYear: { $in: schoolYearsIds },
      $and: [{ class: { $ne: null } }, { class: { $exists: true } }],
      student: { $in: studentsIds },
    });
  }

  async countStudentsNotAssignedToClass(schoolYearsIds: ID[], studentsIds: ID[]): Promise<number> {
    return await this.model.count({
      schoolYear: { $in: schoolYearsIds },
      $or: [{ class: { $eq: null } }, { class: { $exists: false } }],
      student: { $in: studentsIds },
    });
  }
  async getAllStudentProfileOfStudent(student: ID): Promise<StudentProfile[]> {
    return this.model.find({
      student: student,
    });
  }
}
