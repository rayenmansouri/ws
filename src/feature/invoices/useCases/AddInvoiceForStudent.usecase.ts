import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ID } from "../../../types/BaseEntity";
import { PickFromEnum } from "../../../types/utils/enums.util";
import { SchoolServicesService } from "../../finance/domains/schoolServices.service";
import { School } from "../../schools/domain/school.entity";
import { TInvoiceTypeEnum } from "../../studentPayments/domain/invoice.entity";
import { InvoiceRepo } from "../../studentPayments/domain/Invoice.repo";
import { InvoiceService } from "../../studentPayments/domain/Invoice.service";
import { ServiceRepo } from "../../studentPayments/domain/Service.repo";
import { StudentRepo } from "../../students/domain/Student.repo";

type AddInvoiceForStudentParams = {
  studentNewId: string;
  invoiceType: PickFromEnum<TInvoiceTypeEnum, "monthly" | "oneTime">;
  services: { id: ID; discount: number }[];
  emailReminder: boolean;
  email?: string;
  smsReminder: boolean;
  phoneNumber?: string;
  discount: number;
  dates: Date[];
};

@injectable()
export class AddInvoiceForStudentUseCase {
  constructor(
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("ServiceRepo") private serviceRepo: ServiceRepo,
    @inject("School") private school: School,
    @inject("InvoiceRepo") private invoiceRepo: InvoiceRepo,
  ) {}

  async execute(data: AddInvoiceForStudentParams): Promise<void> {
    const student = await this.studentRepo.findOneByNewIdOrThrow(
      data.studentNewId,
      "notFound.student",
      { populate: ["level"] },
    );

    const serviceIds = data.services.map(service => service.id);

    const services = await this.serviceRepo.findNonExtraServicesByIdsOrThrow(serviceIds);

    const servicesWithDiscount = SchoolServicesService.attachServicesWithDiscount(
      data.services,
      services,
    );

    const finalAmount = SchoolServicesService.calculateServicesTotalAmountWithDiscount(
      servicesWithDiscount,
      data.discount,
    );

    const invoicePayloads = InvoiceService.generateInvoicesPayload({
      ...data,
      amount: finalAmount,
      studentInvoiceServices: servicesWithDiscount,
      student,
      schoolDueDate: this.school.dueDate,
    });

    await this.invoiceRepo.addMany(invoicePayloads);

    return;
  }
}
