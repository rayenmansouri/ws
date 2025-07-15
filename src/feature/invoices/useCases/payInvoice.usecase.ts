import { getCurrentTimeOfSchool } from "../../../core/getCurrentTimeOfSchool";
import { NOTIFICATION_TYPES_ENUM } from "../../../features/notification/constants/constants";
import { Connection } from "mongoose";
import { sendNotificationToParentsOfStudent } from "../../../features/notification/services/helpers.service";
import { Invoice } from "../../studentPayments/domain/invoice.entity";
import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { ParentRepo } from "../../parents/domain/Parent.repo";
import { InvoiceRepo } from "../../studentPayments/domain/Invoice.repo";
import { StudentService } from "../../students/domain/Student.service";
import { PaymentServices } from "../../invoices/domain/payment.service";
import { PaymentDtos } from "../../invoices/domain/paymentStrategy";
import { PaymentStrategyFactory } from "../strategies/paymentStrategy.factory";

@injectable()
export class PayInvoiceUseCase {
  constructor(
    @inject("InvoiceRepo") private readonly invoiceRepo: InvoiceRepo,
    @inject("ParentRepo") private readonly parentRepo: ParentRepo,
    @inject("PaymentStrategyFactory")
    private readonly paymentStrategyFactory: PaymentStrategyFactory,
    @inject("Connection") private readonly connection: Connection,
  ) {}

  async execute(dto: PaymentDtos): Promise<Invoice> {
    const invoice = await this.invoiceRepo.findOneByNewIdOrThrow(
      dto.invoiceNewId,
      "notFound.invoice",
    );

    if (PaymentServices.isInvoicePaid(invoice))
      throw new BadRequestError("invoice.invoiceAlreadyPaid");

    if (dto.splitIndex != undefined && PaymentServices.isSplitPaid(invoice, dto.splitIndex - 1))
      throw new BadRequestError("invoice.splitAlreadyPaid");

    if (invoice.mergedInto)
      throw new BadRequestError("invoice.cannotPayInvoiceThatIsMergedIntoAnotherInvoice");

    const parent = await this.parentRepo.findOneByIdOrThrow(dto.parentId, "notFound.parent");

    invoice.students.forEach(student =>
      StudentService.ensureStudentIsAssignedToParent(student.student, parent),
    );

    const result = await this.paymentStrategyFactory
      .getStrategy(dto.paymentMethod)
      .pay(invoice, { ...dto, phoneNumber: parent.phoneNumber });

    await this.notifyParentsForPaymentSuccess(invoice, dto.tenantId, dto.splitIndex);

    return result;
  }

  async notifyParentsForPaymentSuccess(
    invoice: Invoice,
    tenantId: string,
    splitIndex?: number,
  ): Promise<void> {
    const paidAt: Date = getCurrentTimeOfSchool(tenantId);
    const formattedDate = paidAt.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    for (const student of invoice.students)
      if (!splitIndex) {
        await sendNotificationToParentsOfStudent(
          this.connection,
          student.student,
          {
            topic: NOTIFICATION_TYPES_ENUM.FULL_INVOICE_PAYMENT_SUCCESS,
            details: {
              invoiceNewId: invoice.newId,
              amountPaid: invoice.amount,
              paidAt: formattedDate,
            },
          },
          {
            $invoiceNewId: invoice.newId,
            $amountPaid: invoice.amount.toString(),
            $paidAt: formattedDate,
          },
          tenantId,
        );
      } else {
        const unpaidSplits = invoice.paymentSplits.filter(
          (split, index) => split.status !== "paid" && index !== splitIndex - 1,
        );
        const remainingAmount = unpaidSplits.reduce((total, split) => total + split.amount, 0);

        await sendNotificationToParentsOfStudent(
          this.connection,
          student.student,
          {
            topic: NOTIFICATION_TYPES_ENUM.INVOICE_SPLIT_PAYMENT_SUCCESS,
            details: {
              invoiceNewId: invoice.newId,
              amountPaid: invoice.paymentSplits[splitIndex - 1].amount,
              remainingAmount,
              paidAt: formattedDate,
            },
          },
          {
            $invoiceNewId: invoice.newId,
            $amountPaid: invoice.paymentSplits[splitIndex - 1].amount.toString(),
            $remainingAmount: remainingAmount.toString(),
            $paidAt: formattedDate,
          },
          tenantId,
        );
      }
  }
}
