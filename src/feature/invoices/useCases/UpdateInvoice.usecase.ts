import { injectable } from "inversify";
import { sumBy } from "lodash";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { ID } from "../../../types/BaseEntity";
import { SchoolServicesService } from "../../finance/domains/schoolServices.service";
import { TSplitMethodsEnum, TSplitsStatusEnum } from "../../studentPayments/domain/invoice.entity";
import { InvoiceRepo } from "../../studentPayments/domain/Invoice.repo";
import { InvoiceService } from "../../studentPayments/domain/Invoice.service";
import { ServiceRepo } from "../../studentPayments/domain/Service.repo";

export type updateInvoiceUseCaseRequestDto = {
  invoiceNewId: string;
  email?: string | null;
  phoneNumber?: string | null;
  discount: number;
  services: { id: ID; month: number; discount: number }[];
  splits?: {
    _id?: ID;
    amount: number;
    dueDate: Date;
    paymentMethod: TSplitMethodsEnum;
    status: TSplitsStatusEnum;
  }[];
};

@injectable()
export class UpdateInvoiceUseCase {
  constructor(
    @inject("InvoiceRepo") private invoiceRepo: InvoiceRepo,
    @inject("ServiceRepo") private serviceRepo: ServiceRepo,
  ) {}

  async execute(dto: updateInvoiceUseCaseRequestDto): Promise<void> {
    const { invoiceNewId } = dto;
    const invoice = await this.invoiceRepo.findOneByNewIdOrThrow(invoiceNewId, "notFound.invoice");

    InvoiceService.ensureInvoiceCanBeUpdated(invoice, dto.services);

    const serviceIds = dto.services.map(service => service.id);
    const services = await this.serviceRepo.findNonExtraServicesByIdsOrThrow(serviceIds);

    const serviceWithDiscount = SchoolServicesService.attachServicesWithDiscount(
      dto.services,
      services,
    );

    const studentServices = serviceWithDiscount.map(service => ({
      ...service,
      month: dto.services.find(s => s.id === service._id)!.month,
    }));

    const totalServiceAmount = sumBy(studentServices, service =>
      SchoolServicesService.applyDiscount(service.amount, service.discount),
    );

    const finalInvoiceAmountAfterDiscount = SchoolServicesService.applyDiscount(
      totalServiceAmount,
      dto.discount,
    );

    InvoiceService.ensureSplitsPaymentCanBeUpdated(
      invoice,
      totalServiceAmount,
      dto.discount,
      dto.splits,
    );
    const paymentSplits = dto.splits?.map(split => {
      if (!split._id) {
        //NEW payment split
        return {
          ...split,
          _id: this.invoiceRepo.getRandomId(),
          adminIdPaidBy: null,
          paidAt: null,
          adminIdUnPaidBy: null,
          unPaidAt: null,
          parent: null,
          bankCheck: null,
          bankTransfer: null,
        };
      }
      const oldPaymentSplit = invoice.paymentSplits.find(s => s._id === split._id);
      if (!oldPaymentSplit)
        throw new BadRequestError(`Payment split with ID ${split._id} not found in invoice.`);
      //EXISTING payment split , just update the fields that are allowed to be updated
      return { ...oldPaymentSplit, ...split };
    });

    await this.invoiceRepo.updateOneById(invoice._id, {
      email: dto.email,
      phoneNumber: dto.phoneNumber,
      discount: dto.discount,
      services: studentServices,
      paymentSplits,
      amount: finalInvoiceAmountAfterDiscount,
    });
  }
}
