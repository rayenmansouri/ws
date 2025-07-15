import { injectable } from "inversify";
import { differenceBy } from "lodash";
import moment from "moment";
import { inject } from "../../../core/container/TypedContainer";
import { getMonthsBetweenDates } from "../../../helpers/getMonthsBetweenTwoDates.helper";
import { ID } from "../../../types/BaseEntity";
import { SchoolServicesService } from "../../finance/domains/schoolServices.service";
import { School } from "../../schools/domain/school.entity";
import {
  INVOICE_STATUS_ENUM,
  INVOICE_TYPE_ENUM,
} from "../../studentPayments/domain/invoice.entity";
import { InvoiceRepo } from "../../studentPayments/domain/Invoice.repo";
import { InvoiceService } from "../../studentPayments/domain/Invoice.service";
import { MonthlyOrOneTimeService } from "../../studentPayments/domain/service.entity";
import { ServiceRepo } from "../../studentPayments/domain/Service.repo";
import { StudentPaymentConfigurationRepo } from "../../studentPayments/domain/StudentPaymentConfiguration.repo";
import { StudentRepo } from "../../students/domain/Student.repo";

export type updateStudentPaymentConfigurationUseCaseRequestDto = {
  services: { id: ID; discount: number }[];
  emailReminder?: boolean;
  email?: string;
  smsReminder?: boolean;
  phoneNumber?: string;
  discount: number;
  studentNewId: string;
};

@injectable()
export class UpdateStudentPaymentConfigurationUseCase {
  constructor(
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("StudentPaymentConfigurationRepo")
    private studentPaymentConfigurationRepo: StudentPaymentConfigurationRepo,
    @inject("ServiceRepo") private serviceRepo: ServiceRepo,
    @inject("InvoiceRepo") private invoiceRepo: InvoiceRepo,
    @inject("School") private school: School,
  ) {}

  async execute(dto: updateStudentPaymentConfigurationUseCaseRequestDto): Promise<void> {
    const { studentNewId } = dto;
    const student = await this.studentRepo.findOneByNewIdOrThrow(studentNewId, "notFound.student", {
      populate: ["level"],
    });

    const serviceIds = dto.services.map(service => service.id);

    const services = await this.serviceRepo.findManyByIdsOrThrow(serviceIds, "notFound.service");
    SchoolServicesService.validateNonExtraServicesForStudentPayment(services);

    const invoices = await this.invoiceRepo.findStudentMonthlyInvoices(
      student._id,
      student.level.currentSchoolYear._id,
    );

    const monthlyPaidAndOverdueInvoices = invoices.filter(
      invoice =>
        invoice.status === INVOICE_STATUS_ENUM.PAID ||
        invoice.status === INVOICE_STATUS_ENUM.OVERDUE,
    );

    const monthlyUnpaidInvoices = invoices.filter(
      invoice => invoice.status === INVOICE_STATUS_ENUM.UNPAID,
    );
    const monthlyUnpaidInvoicesIds = monthlyUnpaidInvoices.map(invoice => invoice._id);

    await this.invoiceRepo.deleteManyByIds(monthlyUnpaidInvoicesIds);

    const monthlyPaidInvoiceDates = monthlyPaidAndOverdueInvoices.flatMap(invoice => {
      const dates = invoice.dates;
      return dates.map(date => ({ month: date.getMonth(), year: date.getFullYear() }));
    });

    const servicesWithDiscount = SchoolServicesService.attachServicesWithDiscount(
      dto.services,
      services as MonthlyOrOneTimeService[],
    );

    const totalAmountAfterDiscount = SchoolServicesService.calculateServicesTotalAmountWithDiscount(
      servicesWithDiscount,
      dto.discount,
    );
    const schoolYearMonth = getMonthsBetweenDates(
      student.level.currentSchoolYear.startDate,
      student.level.currentSchoolYear.endDate,
    );

    const monthlyUnPaidInvoiceDates = differenceBy(
      schoolYearMonth,
      monthlyPaidInvoiceDates,
      ({ month, year }) => moment({ month, year }).toISOString(),
    );

    const newInvoicesPayload = InvoiceService.generateInvoicesPayload({
      studentInvoiceServices: servicesWithDiscount,
      student,
      invoiceType: INVOICE_TYPE_ENUM.MONTHLY,
      amount: totalAmountAfterDiscount,
      emailReminder: dto.emailReminder === true,
      email: dto.email,
      smsReminder: dto.smsReminder === true,
      phoneNumber: dto.phoneNumber,
      discount: dto.discount,
      dates: monthlyUnPaidInvoiceDates.map(date =>
        moment({ month: date.month, year: date.year }).toDate(),
      ),
      schoolDueDate: this.school.dueDate,
    });

    await this.invoiceRepo.addMany(newInvoicesPayload);

    await this.studentPaymentConfigurationRepo.updateOneByStudent(student._id, {
      services: servicesWithDiscount,
      smsReminder: dto.smsReminder,
      phoneNumber: dto.phoneNumber,
      emailReminder: dto.emailReminder,
      email: dto.email,
      discount: dto.discount,
      totalAmount: totalAmountAfterDiscount,
    });
    return;
  }
}
