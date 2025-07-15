import { injectable } from "inversify";
import { ID } from "../../../types/BaseEntity";
import { inject } from "../../../core/container/TypedContainer";
import { InvoiceRepo } from "../../studentPayments/domain/Invoice.repo";
import { InvoiceService } from "../../studentPayments/domain/Invoice.service";
import { StudentRepo } from "../../students/domain/Student.repo";
import { StudentService } from "../../students/domain/Student.service";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { sumBy, uniq, uniqBy } from "lodash";
import { getCurrentTimeOfSchool } from "../../../core/getCurrentTimeOfSchool";
import { School } from "../../schools/domain/school.entity";
import { BaseUser } from "../../users/domain/baseUser.entity";

export type mergeInvoicesUseCaseRequestDto = {
  invoiceIds: ID[];
  admin: Pick<BaseUser, "_id">;
};
@injectable()
export class MergeInvoicesUseCase {
  constructor(
    @inject("InvoiceRepo") private invoiceRepo: InvoiceRepo,
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("School") private school: School,
  ) {}

  async execute(dto: mergeInvoicesUseCaseRequestDto): Promise<{ newId: string }> {
    const { invoiceIds, admin } = dto;

    const invoices = await this.invoiceRepo.findManyByIdsOrThrow(invoiceIds, "notFound.invoice");

    InvoiceService.ensureInvoicesCanBeMerged(invoices);

    const studentIds = uniq(
      invoices.flatMap(invoice => invoice.students.map(student => student.student)),
    );

    const students = await this.studentRepo.findManyByIdsOrThrow(studentIds, "notFound.student", {
      populate: ["parents"],
    });

    const commonParents = StudentService.getCommonParents(students);

    if (commonParents.length === 0) throw new BadRequestError("invoice.cannotBeMerged");

    const services = InvoiceService.generateServicesWithDate(
      //Invoice already not merged
      invoices.map(invoice => ({ ...invoice, mergedInvoices: [] })),
    );

    const studentWithSchoolYear = uniqBy(
      invoices.flatMap(invoice => invoice.students),
      student => `${student.student}-${student.schoolYear}`,
    );
    const totalAmount = sumBy(invoices, invoice => invoice.amount);
    const totalAmountBeforeDiscount = sumBy(invoices, invoice =>
      InvoiceService.calculateInvoiceAmountBeforeDiscount(invoice),
    );

    const discount = InvoiceService.calculateDiscountRate(totalAmountBeforeDiscount, totalAmount);
    const status = InvoiceService.determineStatus(invoices);

    const invoicesDueDate = invoices.map(invoice => invoice.dueDate);
    const currentDate = getCurrentTimeOfSchool(this.school._id);
    const nearestDueDate = Math.min(
      ...invoicesDueDate.map(date => Math.abs(date.getTime() - currentDate.getTime())),
    );

    const uniqueDates = uniqBy(invoicesDueDate, date => date.getTime());

    const invoice = await this.invoiceRepo.addOne({
      students: studentWithSchoolYear,
      invoiceType: InvoiceService.determineInvoiceType(invoices),
      remindedByEmailAt: null,
      remindedByPhoneAt: null,
      services,
      status,
      amount: totalAmount,
      discount,
      dueDate: new Date(nearestDueDate),
      isMerged: true,
      mergedBy: admin._id,
      mergedAt: currentDate,
      levels: students.map(student => student.level),
      mergedInvoices: invoices.map(invoice => invoice._id),
      dates: uniqueDates,
      parent: null,
      email: null,
      phoneNumber: null,
      mergedInto: null,
      adminIdUnPaidBy: null,
      adminIdPaidBy: null,
      paymentMethod: null,
      paidAt: null,
      unPaidAt: null,
      paymentSplits: [],
    });

    await this.invoiceRepo.updateManyByIds(invoiceIds, {
      mergedInto: invoice._id,
    });
    return { newId: invoice.newId };
  }
}
