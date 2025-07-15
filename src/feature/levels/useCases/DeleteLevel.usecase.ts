import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { LevelRepo } from "../repos/Level.repo";
import { SchoolYearRepo } from "../../schoolYears/domain/SchoolYear.repo";
import { InvoiceRepo } from "../../studentPayments/domain/Invoice.repo";
import { TeacherRepo } from "../../teachers/domain/Teacher.repo";
import { TransactionRepo } from "../../transactions/transaction.repo";
import { PreRegistrationRepo } from "../../preRegistration/domains/PreRegistration.repo";
import { SubLevelRepo } from "../../subLevels/domains/SubLevel.repo";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { TeacherPaymentHistoryRepo } from "../../teacherPayment/domain/TeacherPaymentHistory.repo";
import { StudentRepo } from "../../students/domain/Student.repo";
import { ClassTypeRepo } from "../../classTypes/repo/ClassType.repo";

@injectable()
export class DeleteLevelUseCase {
  constructor(
    @inject("LevelRepo") private levelRepo: LevelRepo,
    @inject("SubLevelRepo") private subLevelRepo: SubLevelRepo,
    @inject("SchoolYearRepo") private schoolYearRepo: SchoolYearRepo,
    @inject("InvoiceRepo") private invoiceRepo: InvoiceRepo,
    @inject("TeacherRepo") private teacherRepo: TeacherRepo,
    @inject("TransactionRepo") private transactionRepo: TransactionRepo,
    @inject("PreRegistrationRepo") private preRegistrationRepo: PreRegistrationRepo,
    @inject("TeacherPaymentHistoryRepo")
    private teacherPaymentHistoryRepo: TeacherPaymentHistoryRepo,
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
  ) {}

  async execute(levelNewId: string): Promise<void> {
    const level = await this.levelRepo.findOneByNewIdOrThrow(levelNewId, "notFound.level");

    const schoolYear = await this.schoolYearRepo.findManyByLevel(level._id);
    const hasMultipleSchoolYear = schoolYear.length > 1;
    if (hasMultipleSchoolYear) throw new BadRequestError("level.hasMultipleSchoolYear");

    const subLevels = await this.subLevelRepo.findManyByLevel(level._id);
    if (subLevels.length > 0) throw new BadRequestError("level.hasSubLevels");

    const subLevelIds = subLevels.map(subLevel => subLevel._id);
    const classTypes = await this.classTypeRepo.findManySubLevels(subLevelIds);

    if (classTypes.length > 0) throw new BadRequestError("level.hasClassTypes");

    const invoices = await this.invoiceRepo.findManyByLevel(level._id);
    if (invoices.length > 0) throw new BadRequestError("level.hasInvoices");

    const teacher = await this.teacherRepo.findManyByLevel(level._id);
    if (teacher.length > 0) throw new BadRequestError("level.hasTeacher");

    const teacherPaymentHistory = await this.teacherPaymentHistoryRepo.findManyByLevel(level._id);
    if (teacherPaymentHistory.length > 0)
      throw new BadRequestError("level.hasTeacherPaymentHistory");

    const students = await this.studentRepo.findManyByLevel(level._id);
    if (students.length > 0) throw new BadRequestError("level.hasStudents");

    const transactions = await this.transactionRepo.findManyByLevel(level._id);
    if (transactions.length > 0) throw new BadRequestError("level.hasTransactions");

    const preRegistrations = await this.preRegistrationRepo.findManyByLevel(level._id);
    if (preRegistrations.length > 0) throw new BadRequestError("level.hasPreRegistrations");

    await this.levelRepo.deleteOneById(level._id);
    await this.schoolYearRepo.deleteOneById(level.currentSchoolYear._id);
  }
}
