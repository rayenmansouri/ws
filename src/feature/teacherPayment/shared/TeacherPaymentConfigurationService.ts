import { SESSION_STATUS_ENUM } from "../../../database/schema/pedagogy/session/session.schema";
import { TeacherPaymentDomainServices } from "../domain/services";
import { TPaymentTypeEnum } from "../domain/teacherPaymentConfiguration.entity";
import { transactionAdjustment } from "../domain/teacherPaymentHistory.entity";
import { BadRequestError } from "./../../../core/ApplicationErrors";
import { TSessionStatusEnum } from "./../../../database/schema/pedagogy/session/session.schema";

export type calculateTeacherFinalSalaryParamsDto = {
  transactionsAdjustment: transactionAdjustment[];
  currentPaymentType: TPaymentTypeEnum;
  currentSalaryAmount: number;
  hourlyDistributions: {
    sessionStatus: TSessionStatusEnum;
    totalMinutes: number;
    totalHours: number;
  }[];
};

export class TeacherPaymentConfigurationService {
  constructor() {}

  static calculateTeacherFinalSalary(dto: calculateTeacherFinalSalaryParamsDto): number {
    const transactionAmount = TeacherPaymentDomainServices.getTotalTransactionAdjustmentAmount(
      dto.transactionsAdjustment,
    );

    let finalAmount: number = 0;
    if (dto.currentPaymentType === "hourly") {
      const completedHour = dto.hourlyDistributions.find(
        distribution => distribution.sessionStatus === SESSION_STATUS_ENUM.COMPLETED,
      );

      const totalHours: number = completedHour ? completedHour.totalHours : 0;
      finalAmount = totalHours * dto.currentSalaryAmount + transactionAmount;
    }

    if (dto.currentPaymentType === "salary")
      finalAmount = dto.currentSalaryAmount + transactionAmount;

    if (finalAmount < 0) {
      throw new BadRequestError("invoice.salaryCannotBeNegative");
    }

    return finalAmount;
  }
}
