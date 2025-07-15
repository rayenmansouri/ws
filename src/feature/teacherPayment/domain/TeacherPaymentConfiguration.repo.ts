import { BaseRepo } from "../../../core/BaseRepo";
import { ID } from "../../../types/BaseEntity";
import {
  TeacherPaymentConfiguration,
  TeacherPaymentConfigurationMetaData,
} from "./teacherPaymentConfiguration.entity";

export abstract class TeacherPaymentConfigurationRepo extends BaseRepo<TeacherPaymentConfigurationMetaData> {
  abstract findOneByTeacherId(teacherId: ID): Promise<TeacherPaymentConfiguration | null>;
}
