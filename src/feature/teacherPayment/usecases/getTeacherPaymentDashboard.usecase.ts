import { injectable } from "inversify";
import moment from "moment";
import { inject } from "../../../core/container/TypedContainer";
import { AdminRepo } from "../../admins/domain/Admin.repo";
import { ClassGroupRepo } from "../../classes/domain/classGroup.repo";
import { SessionRepo } from "../../sessionManagement/domain/Session.repo";
import { SubjectTypeRepo } from "../../subjectTypes/domains/SubjectType.repo";
import { TeacherRepo } from "../../teachers/domain/Teacher.repo";
import { TeacherPaymentConfigurationRepo } from "../domain/TeacherPaymentConfiguration.repo";
import { TeacherPaymentHistoryRepo } from "../domain/TeacherPaymentHistory.repo";
import { SESSION_STATUS_ENUM } from "./../../../database/schema/pedagogy/session/session.schema";
import { ID } from "./../../../types/BaseEntity";
import { PAYMENT_TYPE_ENUM } from "./../../teacherPayment/domain/teacherPaymentConfiguration.entity";
import { UserMapper } from "./../../users/mappers/User.mapper";
import { TeacherPaymentDomainServices } from "./../domain/services";
import {
  getTeacherPaymentDashboardResponse,
  transactionAdjustmentResponse,
} from "./../types/responses.types";

export type getTeacherPaymentDashboardRequestDto = {
  year: number;
  month: number;
  teacherNewId: string;
};

@injectable()
export class GetTeacherPaymentDashboardUseCase {
  constructor(
    @inject("TeacherRepo") private readonly teacherRepo: TeacherRepo,
    @inject("TeacherPaymentConfigurationRepo")
    private readonly teacherPaymentConfigurationRepo: TeacherPaymentConfigurationRepo,
    @inject("SubjectTypeRepo") private readonly subjectTypeRepo: SubjectTypeRepo,
    @inject("ClassGroupRepo") private readonly classGroupeRepo: ClassGroupRepo,
    @inject("SessionRepo") private readonly sessionRepo: SessionRepo,
    @inject("TeacherPaymentHistoryRepo")
    private readonly teacherPaymentHistory: TeacherPaymentHistoryRepo,
    @inject("AdminRepo") private readonly adminRepo: AdminRepo,
  ) {}

  async execute(
    dto: getTeacherPaymentDashboardRequestDto,
  ): Promise<getTeacherPaymentDashboardResponse> {
    const teacher = await this.teacherRepo.findOneByNewIdOrThrow(
      dto.teacherNewId,
      "notFound.teacher",
    );
    const teacherPaymentConfiguration =
      await this.teacherPaymentConfigurationRepo.findOneByTeacherId(teacher._id);

    const subjectTypeId: ID | null =
      teacher.subjectTypes.length > 0 ? teacher.subjectTypes[0] : null;
    const classGroupId: ID | null = teacher.groupTypes.length > 0 ? teacher.groupTypes[0] : null;
    let subjectName: string | null = null;

    if (subjectTypeId) {
      const subjectType = await this.subjectTypeRepo.findOneByIdOrThrow(
        subjectTypeId,
        "notFound.subjectType",
      );
      subjectName = subjectType.name;
    }

    if (classGroupId && !subjectTypeId) {
      const classGroup = await this.classGroupeRepo.findOneByIdOrThrow(
        classGroupId,
        "notFound.classGroup",
      );
      subjectName = classGroup.name;
    }

    if (!teacherPaymentConfiguration) {
      return {
        isPaymentConfigured: false,
        teacherInformation: {
          subject: subjectName,
          ...UserMapper.toUserProfileDTO(teacher),
        },
      };
    }

    const startTime: Date = moment({ month: dto.month, year: dto.year }).startOf("month").toDate();
    const endTime: Date = moment({ month: dto.month, year: dto.year }).endOf("month").toDate();

    const teacherHoursDistribution = await this.sessionRepo.getTeacherHourDistribution(
      startTime,
      endTime,
      teacher._id,
    );

    const totalCompletedHours =
      teacherHoursDistribution.find(
        hourTeacherDistr => hourTeacherDistr.sessionStatus === SESSION_STATUS_ENUM.COMPLETED,
      )?.totalHours ?? 0;

    const paymentHistory = await this.teacherPaymentHistory.findOneByTeacherMonthAndYear(
      teacher._id,
      dto.month,
      dto.year,
    );

    let transactionAdjustmentAmount = 0;
    let transactionAdjustment: transactionAdjustmentResponse[] = [];
    let hasPaid = false;

    if (paymentHistory) {
      const adminIds = paymentHistory.transactionAdjustment.map(transaction => transaction.paidBy);
      const admins = await this.adminRepo.findManyByIds(adminIds);
      transactionAdjustmentAmount =
        TeacherPaymentDomainServices.getTotalTransactionAdjustmentAmount(
          paymentHistory.transactionAdjustment,
        );

      transactionAdjustment = paymentHistory.transactionAdjustment.map(doc => {
        const paidBy = admins.find(admin => admin._id === doc.paidBy)!;

        return {
          ...doc,
          teacherPaymentId: paymentHistory._id,
          paidBy: UserMapper.toUserProfileDTO(paidBy),
        };
      });
      hasPaid = paymentHistory.hasPaid;
    }
    let paymentInformation: { finalAmount: number; hasPaid: boolean };

    if (teacherPaymentConfiguration.paymentType === PAYMENT_TYPE_ENUM.SALARY) {
      paymentInformation = {
        // prettier-ignore
        finalAmount: (paymentHistory?.baseAmount ?? teacherPaymentConfiguration.amount) + transactionAdjustmentAmount,
        hasPaid,
      };
    } else {
      paymentInformation = {
        // prettier-ignore
        finalAmount: (paymentHistory?.baseAmount ?? teacherPaymentConfiguration.amount * totalCompletedHours) + transactionAdjustmentAmount,
        hasPaid,
      };
    }

    const allStatus = Object.values(SESSION_STATUS_ENUM).filter(
      status => status != SESSION_STATUS_ENUM.IN_PROGRESS,
    );

    const mappedHourDistribution = allStatus.map(status => {
      const currentDistribution = teacherHoursDistribution.find(distribution => {
        return distribution.sessionStatus === status;
      })!;
      return { tag: status, percentage: currentDistribution?.totalHours || 0 };
    });

    return {
      paymentInformation,
      isPaymentConfigured: true,
      teacherInformation: {
        paymentType: teacherPaymentConfiguration.paymentType,
        amount: teacherPaymentConfiguration.amount,
        bankAccountId: teacherPaymentConfiguration.bankAccountId,
        subject: subjectName!,
        ...UserMapper.toUserProfileDTO(teacher),
      },
      transactions: transactionAdjustment,
      hourDistribution: mappedHourDistribution,
    };
  }
}
