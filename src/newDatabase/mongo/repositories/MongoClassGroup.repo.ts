import { ID } from "../../../types/BaseEntity";
import { ClientSession, Connection } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { ClassGroupMetaData } from "../../../feature/classes/domain/classGroup.entity";
import { ClassGroupRepo } from "../../../feature/classes/domain/classGroup.repo";
import { MongoBaseRepo } from "./MongoBase.repo";

export class MongoClassGroupRepo
  extends MongoBaseRepo<ClassGroupMetaData>
  implements ClassGroupRepo
{
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "classGroup", session);
  }

  async removeStudentsFromClassGroup(classGroupId: ID, studentIds: ID[]): Promise<void> {
    await this.model.updateOne(
      { _id: classGroupId },
      { $pull: { students: { $in: studentIds } } },
      { session: this.session },
    );
  }

  async addStudentsToClassGroup(classGroupId: ID, studentIds: ID[]): Promise<void> {
    await this.model.updateOne(
      { _id: classGroupId },
      { $addToSet: { students: { $each: studentIds } } },
      { session: this.session },
    );
  }

  async switchStudentGroup(studentId: ID, from: ID, to: ID): Promise<void> {
    await Promise.all([
      this.model.updateOne(
        { _id: from },
        { $pull: { students: studentId } },
        {
          session: this.session,
        },
      ),
      this.model.updateOne(
        { _id: to },
        { $push: { students: studentId } },
        { session: this.session },
      ),
    ]);
  }
}
