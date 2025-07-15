import { StudentPaymentConfiguration } from "../../studentPayments/domain/studentPaymentConfiguration.entity";
import { StudentPaymentConfigurationDto } from "../dtos/studentPaymentConfiguration.dto";

export class StudentPaymentConfigurationMapper {
  static toStudentPaymentConfigurationDto(
    studentPaymentConfiguration: StudentPaymentConfiguration,
  ): StudentPaymentConfigurationDto {
    return {
      _id: studentPaymentConfiguration._id,
      emailReminder: studentPaymentConfiguration.emailReminder,
      smsReminder: studentPaymentConfiguration.smsReminder,
      services: studentPaymentConfiguration.services.map(service => this.toServiceDto(service)),
      newId: studentPaymentConfiguration.newId,
      email: studentPaymentConfiguration.email,
      phoneNumber: studentPaymentConfiguration.phoneNumber,
      discount: studentPaymentConfiguration.discount,
      studentId: studentPaymentConfiguration.student,
      totalAmount: studentPaymentConfiguration.totalAmount,
    };
  }

  private static toServiceDto(
    service: StudentPaymentConfiguration["services"][number],
  ): StudentPaymentConfigurationDto["services"][number] {
    return {
      amount: service.amount,
      discount: service.discount,
      name: service.name,
      newId: service.newId,
      _id: service._id,
    };
  }
}
