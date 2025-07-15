import { injectable } from "inversify";
import { ClientSession, Connection } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { StudentPaymentConfigurationMetaData } from "../../../feature/studentPayments/domain/studentPaymentConfiguration.entity";
import { StudentPaymentConfigurationRepo } from "../../../feature/studentPayments/domain/StudentPaymentConfiguration.repo";
import { MongoBaseRepo } from "./MongoBase.repo";
import { ID } from "../../../types/BaseEntity";

@injectable()
export class MongoStudentPaymentConfiguration
  extends MongoBaseRepo<StudentPaymentConfigurationMetaData>
  implements StudentPaymentConfigurationRepo
{
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "paymentConfiguration", session);
  }

  async updateOneByStudent(
    studentId: ID,
    data: Partial<StudentPaymentConfigurationMetaData["entity"]>,
  ): Promise<void> {
    await this.model
      .findOneAndUpdate(
        { student: studentId },
        { $set: data },
        { new: true, session: this.session },
      )
      .lean();
  }

  async getOneByStudentOrThrow(
    studentId: ID,
  ): Promise<StudentPaymentConfigurationMetaData["entity"]> {
    const paymentConfiguration = await this.model
      .findOne({ student: studentId })
      .session(this.session)
      .lean();

    if (!paymentConfiguration) {
      throw new Error(`Payment configuration for student with ID ${studentId} not found.`);
    }

    return paymentConfiguration;
  }

  async findManyByServiceIds(
    serviceIds: string[],
  ): Promise<StudentPaymentConfigurationMetaData["entity"][]> {
    return this.model
      .find({ "services._id": { $in: serviceIds } })
      .session(this.session)
      .lean();
  }
}
