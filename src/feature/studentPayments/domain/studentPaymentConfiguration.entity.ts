import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity, ID } from "../../../types/BaseEntity";
import { Student } from "../../students/domain/student.entity";
import { MonthlyOrOneTimeService } from "./service.entity";

export type StudentPaymentConfiguration = {
  student: ID;
  discount: number;
  totalAmount: number;
  email: string | null;
  emailReminder: boolean;
  phoneNumber: string | null;
  smsReminder: boolean;
  services: (MonthlyOrOneTimeService & { discount: number })[];
} & BaseEntity;

export type StudentPaymentConfigurationMetaData = GenerateMetaData<
  StudentPaymentConfiguration,
  {
    student: Student;
  }
>;
