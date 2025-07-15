import {
  TeacherPaymentConfigurationService,
  calculateTeacherFinalSalaryParamsDto,
} from "./../shared/TeacherPaymentConfigurationService";
import { injectable } from "inversify";
import moment from "moment";
import { inject } from "../../../core/container/TypedContainer";
import { SessionRepo } from "../../sessionManagement/domain/Session.repo";
import { TeacherRepo } from "../../teachers/domain/Teacher.repo";
import { TeacherPaymentConfigurationRepo } from "../domain/TeacherPaymentConfiguration.repo";
import { TeacherPaymentHistoryRepo } from "../domain/TeacherPaymentHistory.repo";
import { BadRequestError, NotFoundError } from "./../../../core/ApplicationErrors";
import { getCurrentTimeOfSchool } from "./../../../core/getCurrentTimeOfSchool";
import { SESSION_STATUS_ENUM } from "./../../../database/schema/pedagogy/session/session.schema";
import { ID } from "./../../../types/BaseEntity";

export type payTeacherRequestDto = {
  month: number;
  year: number;
  teacherNewId: string;
  tenantId: string;
  adminId: ID;
};

@injectable()
export class PayTeacherUseCase {
  constructor(
    @inject("TeacherRepo") private readonly teacherRepo: TeacherRepo,
    @inject("TeacherPaymentHistoryRepo")
    private readonly teacherPaymentHistory: TeacherPaymentHistoryRepo,
    @inject("TeacherPaymentConfigurationRepo")
    private readonly teacherPaymentConfiguration: TeacherPaymentConfigurationRepo,
    @inject("SessionRepo") private readonly sessionRepo: SessionRepo,
  ) {}

  async execute(dto: payTeacherRequestDto): Promise<void> {
    const teacher = await this.teacherRepo.findOneByNewIdOrThrow(
      dto.teacherNewId,
      "notFound.teacher",
    );

    if (teacher.isArchived) throw new NotFoundError("notFound.teacher");

    const teacherPaymentHistory = await this.teacherPaymentHistory.findOneByTeacherMonthAndYear(
      teacher._id,
      dto.month,
      dto.year,
    );

    const teacherPaymentConfiguration = await this.teacherPaymentConfiguration.findOneByTeacherId(
      teacher._id,
    );

    if (!teacherPaymentConfiguration)
      throw new NotFoundError("notFound.teacherPaymentConfiguration");

    if (teacherPaymentHistory && teacherPaymentHistory.hasPaid)
      throw new BadRequestError("teacher.alreadyPaid");

    let totalAmount = teacherPaymentConfiguration.amount;

    const startTime = moment({ month: dto.month, year: dto.year }).startOf("month").toDate();
    const endTime = moment({ month: dto.month, year: dto.year }).endOf("month").toDate();
    const hourDistribution = await this.sessionRepo.getTeacherHourDistribution(
      startTime,
      endTime,
      teacher._id,
    );
    if (teacherPaymentConfiguration.paymentType === "hourly") {
      const totalHours = hourDistribution.find(
        distr => distr.sessionStatus === SESSION_STATUS_ENUM.COMPLETED,
      )?.totalHours;
      const completedTeacherHour = totalHours ?? 0;
      totalAmount = completedTeacherHour * teacherPaymentConfiguration.amount;
      await this.sessionRepo.updateTeacherPaymentStatus(teacher._id, { startTime, endTime }, true);
    }

    const calculateTeacherPaymentConfigurationParams: calculateTeacherFinalSalaryParamsDto = {
      transactionsAdjustment: teacherPaymentHistory?.transactionAdjustment || [],
      currentPaymentType: teacherPaymentConfiguration.paymentType,
      currentSalaryAmount: teacherPaymentConfiguration.amount,
      hourlyDistributions: hourDistribution,
    };

    TeacherPaymentConfigurationService.calculateTeacherFinalSalary(
      calculateTeacherPaymentConfigurationParams,
    );

    if (teacherPaymentHistory) {
      await this.teacherPaymentHistory.updateTeacherPaymentHistory(
        teacherPaymentHistory._id,
        teacher._id,
        {
          month: dto.month,
          year: dto.year,
          currentTimeOfSchool: getCurrentTimeOfSchool(dto.tenantId),
          teacherLevel: teacher.levels[0],
          adminId: dto.adminId,
          totalSalary: totalAmount,
        },
      );
      return;
    }

    await this.teacherPaymentHistory.addOne({
      paidBy: dto.adminId,
      month: dto.month,
      year: dto.year,
      baseAmount: totalAmount,
      hasPaid: true,
      transactionAdjustment: [],
      teacher: teacher._id,
      paidAt: getCurrentTimeOfSchool(dto.tenantId),
      level: teacher.levels[0],
    });
  }
}
