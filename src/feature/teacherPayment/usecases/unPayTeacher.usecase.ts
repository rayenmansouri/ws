import { injectable } from "inversify";
import moment from "moment";
import { inject } from "../../../core/container/TypedContainer";
import { SessionRepo } from "../../sessionManagement/domain/Session.repo";
import { TeacherRepo } from "../../teachers/domain/Teacher.repo";
import { TeacherPaymentConfigurationRepo } from "../domain/TeacherPaymentConfiguration.repo";
import { TeacherPaymentHistoryRepo } from "../domain/TeacherPaymentHistory.repo";
import { BadRequestError, NotFoundError } from "./../../../core/ApplicationErrors";
import { Teacher } from "./../../teachers/domain/teacher.entity";

export type unpayTeacherRequestDto = {
  teacherNewId: string;
  month: number;
  year: number;
};
@injectable()
export class UnPayTeacherUseCase {
  constructor(
    @inject("TeacherRepo") private readonly teacherRepo: TeacherRepo,
    @inject("TeacherPaymentHistoryRepo")
    private teacherPaymentHistoryRepo: TeacherPaymentHistoryRepo,
    @inject("TeacherPaymentConfigurationRepo")
    private teacherPaymentConfigurationRepo: TeacherPaymentConfigurationRepo,
    @inject("SessionRepo") private readonly sessionRepo: SessionRepo,
  ) {}

  async execute(dto: unpayTeacherRequestDto): Promise<void> {
    const teacher: Teacher = await this.teacherRepo.findOneByNewIdOrThrow(
      dto.teacherNewId,
      "notFound.teacher",
    );

    const teacherPaymentConfiguration =
      await this.teacherPaymentConfigurationRepo.findOneByTeacherId(teacher._id);

    if (!teacherPaymentConfiguration)
      throw new NotFoundError("notFound.teacherPaymentConfiguration");

    const teacherPaymentHistory = await this.teacherPaymentHistoryRepo.findOneByTeacherMonthAndYear(
      teacher._id,
      dto.month,
      dto.year,
    );
    if (!teacherPaymentHistory) throw new NotFoundError("notFound.paymentHistory");

    if (!teacherPaymentHistory.hasPaid) throw new BadRequestError("teacher.notPaid");

    if (teacherPaymentConfiguration.paymentType === "hourly") {
      const startTime = moment({ year: dto.year, month: dto.month }).startOf("month").toDate();

      const endTime = moment({ year: dto.year, month: dto.month }).endOf("month").toDate();

      await this.sessionRepo.updateTeacherPaymentStatus(teacher._id, { startTime, endTime }, false);
    }
    await this.teacherPaymentHistoryRepo.updateOneById(teacherPaymentHistory._id, {
      hasPaid: false,
      baseAmount: null,
      paidBy: null,
      paidAt: null,
      level: null,
    });
  }
}
