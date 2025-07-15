import { BaseRepo } from "../../../core/BaseRepo";
import { ID } from "../../../types/BaseEntity";
import { StudentPaymentConfigurationMetaData } from "./studentPaymentConfiguration.entity";

export abstract class StudentPaymentConfigurationRepo extends BaseRepo<StudentPaymentConfigurationMetaData> {
  abstract findManyByServiceIds(
    serviceIds: string[],
  ): Promise<StudentPaymentConfigurationMetaData["entity"][]>;
  abstract getOneByStudentOrThrow(
    studentId: ID,
  ): Promise<StudentPaymentConfigurationMetaData["entity"]>;
  abstract updateOneByStudent(
    studentId: ID,
    data: Partial<StudentPaymentConfigurationMetaData["entity"]>,
  ): Promise<void>;
}
