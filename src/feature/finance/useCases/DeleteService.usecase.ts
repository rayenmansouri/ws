import { injectable } from "inversify/lib/inversify";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { ID } from "../../../types/BaseEntity";
import { InvoiceRepo } from "../../studentPayments/domain/Invoice.repo";
import { InvoiceService } from "../../studentPayments/domain/Invoice.service";
import { PaymentTemplateRepo } from "../../studentPayments/domain/PaymentTemplate.repo";
import { PaymentTemplateService } from "../../studentPayments/domain/PaymentTemplate.service";
import { ServiceRepo } from "../../studentPayments/domain/Service.repo";
import { StudentPaymentConfigurationRepo } from "../../studentPayments/domain/StudentPaymentConfiguration.repo";
import { StudentPaymentConfigurationService } from "../../studentPayments/domain/StudentPaymentConfiguration.service";

type DeleteServiceUseCaseParams = {
  serviceIds: ID[];
};

@injectable()
export class DeleteServiceUseCase {
  constructor(
    @inject("ServiceRepo") private serviceRepo: ServiceRepo,
    @inject("InvoiceRepo") private invoiceRepo: InvoiceRepo,
    @inject("StudentPaymentConfigurationRepo")
    private studentPaymentConfigurationRepo: StudentPaymentConfigurationRepo,
    @inject("PaymentTemplateRepo") private paymentTemplateRepo: PaymentTemplateRepo,
  ) {}

  async execute(params: DeleteServiceUseCaseParams): Promise<void> {
    const { serviceIds } = params;

    await this.serviceRepo.findManyByIdsOrThrow(serviceIds, "notFound.service");

    const paidInvoices = await this.invoiceRepo.findManyByServices(serviceIds);

    if (paidInvoices.length > 0) throw new BadRequestError("services.isUsed");

    const studentPaymentConfigurations =
      await this.studentPaymentConfigurationRepo.findManyByServiceIds(serviceIds);

    const updatedStudentPaymentConfigurations = StudentPaymentConfigurationService.removeServices(
      studentPaymentConfigurations,
      serviceIds,
    );

    await Promise.all(
      updatedStudentPaymentConfigurations.map(updatedStudentPaymentConfiguration =>
        this.studentPaymentConfigurationRepo.updateOneById(updatedStudentPaymentConfiguration._id, {
          services: updatedStudentPaymentConfiguration.services,
          totalAmount: updatedStudentPaymentConfiguration.totalAmount,
        }),
      ),
    );

    const paymentTemplates = await this.paymentTemplateRepo.findManyByServiceIds(serviceIds);
    const updatedPaymentTemplates = PaymentTemplateService.removeServices(
      paymentTemplates,
      serviceIds,
    );

    const updatedPaymentTemplatePromises = updatedPaymentTemplates.map(updatedPaymentTemplate =>
      this.paymentTemplateRepo.updateOneById(updatedPaymentTemplate._id, {
        services: updatedPaymentTemplate.services,
        totalAmount: updatedPaymentTemplate.totalAmount,
      }),
    );

    await Promise.all(updatedPaymentTemplatePromises);

    const unpaidInvoices = await this.invoiceRepo.findUnpaidInvoicesByServiceIds(serviceIds);
    const updatedInvoices = InvoiceService.removeServices(unpaidInvoices, serviceIds);

    const updateInvoicePromises = updatedInvoices.map(updatedInvoice =>
      this.invoiceRepo.updateOneById(updatedInvoice._id, {
        services: updatedInvoice.services,
        amount: updatedInvoice.amount,
      }),
    );
    await Promise.all(updateInvoicePromises);

    await this.serviceRepo.deleteManyByIds(serviceIds);
  }
}
