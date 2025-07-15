import { ClientSession, Connection } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import {
  TeacherPaymentConfiguration,
  TeacherPaymentConfigurationMetaData,
} from "../../../feature/teacherPayment/domain/teacherPaymentConfiguration.entity";
import { TeacherPaymentConfigurationRepo } from "../../../feature/teacherPayment/domain/TeacherPaymentConfiguration.repo";
import { ID } from "../../../types/BaseEntity";
import { MongoBaseRepo } from "./MongoBase.repo";

export class MongoTeacherPaymentConfigurationRepo
  extends MongoBaseRepo<TeacherPaymentConfigurationMetaData>
  implements TeacherPaymentConfigurationRepo
{
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "teacherPaymentConfiguration", session);
  }

  async findOneByTeacherId(teacherId: ID): Promise<TeacherPaymentConfiguration | null> {
    const teacherPaymentConfiguration = await this.model.findOne(
      { teacher: teacherId },
      {},
      {
        populate: ["teacher"],
      },
    );

    return teacherPaymentConfiguration;
  }
}
