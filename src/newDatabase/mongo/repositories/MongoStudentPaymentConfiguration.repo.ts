import { injectable } from "inversify";
import { ClientSession, Connection } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { StudentPaymentConfigurationMetaData } from "../../../feature/studentPayments/studentPaymentConfiguration.entity";
import { StudentPaymentConfigurationRepo } from "../../../feature/studentPayments/StudentPaymentConfiguration.repo";
import { MongoBaseRepo } from "./MongoBase.repo";

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
}
