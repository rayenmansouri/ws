import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { School } from "../../schools/domain/school.entity";
import { InvoiceRepo } from "../../studentPayments/domain/Invoice.repo";
import { InvoiceService } from "../../studentPayments/domain/Invoice.service";
import { InvoiceMapper } from "../mappers/invoice.mapper";
import { InvoicePdfDataDto } from "../dtos/invoice.dto";

@injectable()
export class GetInvoicePdfDataUseCase {
  constructor(
    @inject("School") private school: School,
    @inject("InvoiceRepo") private invoiceRepo: InvoiceRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
  ) {}

  async execute(invoiceNewId: string): Promise<InvoicePdfDataDto> {
    const invoice = await this.invoiceRepo.findOneByNewIdOrThrow(invoiceNewId, "notFound.invoice", {
      populate: ["students.student", "parent"],
    });

    InvoiceService.ensureInvoiceCanBePrinted(invoice);
    const studentIds = invoice.students.map(student => student.student._id);
    const schoolYearIds = invoice.students.map(student => student.schoolYear);
    const studentClasses = await this.classRepo.getManyByStudents(studentIds, schoolYearIds);

    const servicesByMonth = InvoiceService.groupServicesByMonth(invoice.services);

    const lastPaidSplitPayment = InvoiceService.getLastPaidSplitPayment(invoice.paymentSplits);

    const remainingAmount = InvoiceService.calculateRemainingAmount(invoice);

    const studentWithClass = invoice.students.map(student => {
      const studentClass = studentClasses.find(studentClass =>
        studentClass.students.includes(student.student._id),
      );
      return { name: student.student.fullName, className: studentClass?.name || null };
    });

    const invoicePdfData = InvoiceMapper.toInvoicePdfDataDto({
      invoice,
      services: servicesByMonth,
      students: studentWithClass,
      amountBeforeDiscount: InvoiceService.calculateInvoiceAmountBeforeDiscount(invoice),
      lastPaidSplit: lastPaidSplitPayment,
      dueAmount: remainingAmount,
      school: this.school,
    });
    return invoicePdfData;
  }
}
