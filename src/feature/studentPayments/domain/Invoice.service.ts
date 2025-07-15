import { difference, groupBy, sumBy } from "lodash";
import { BadRequestError, InternalError, NotFoundError } from "../../../core/ApplicationErrors";
import { Populate } from "../../../core/populateTypes";
import { RandomUtils } from "../../../helpers/RandomUtils";
import { BaseEntity, ID } from "../../../types/BaseEntity";
import { PickFromEnum } from "../../../types/utils/enums.util";
import { SchoolServicesService } from "../../finance/domains/schoolServices.service";
import { StudentServiceDto } from "../../finance/dtos/SchoolService.dto";
import { SchoolServiceMapper } from "../../finance/mappers/SchoolService.mapper";
import { SERVICE_TYPE_ENUM } from "../../studentPayments/domain/service.entity";
import { StudentMetaData } from "../../students/domain/student.entity";
import {
  Invoice,
  INVOICE_STATUS_ENUM,
  INVOICE_TYPE_ENUM,
  InvoiceMetaData,
  StudentInvoiceService,
  TInvoiceStatusEnum,
  TInvoiceTypeEnum,
  TSplitsStatusEnum,
} from "./invoice.entity";

export class InvoiceService {
  private static MIN_NUMBER_OF_SPLITS_ALLOWED = 2;
  static removeServices(invoices: Invoice[], serviceIds: ID[]): Invoice[] {
    return invoices.map(invoice => {
      const updatedServices = invoice.services.filter(service => !serviceIds.includes(service._id));

      const totalAmount = SchoolServicesService.calculateServicesTotalAmountWithDiscount(
        updatedServices,
        invoice.discount,
      );
      return { ...invoice, services: updatedServices, totalAmount };
    });
  }

  static getOneTimeInvoices<T extends Pick<Invoice, "invoiceType">>(invoices: T[]): T[] {
    const oneTimeInvoices = invoices.filter(
      invoice => invoice.invoiceType === INVOICE_TYPE_ENUM.ONE_TIME,
    );

    return oneTimeInvoices;
  }

  static getMainInvoices<T extends Pick<Invoice, "invoiceType">>(invoices: T[]): T[] {
    const mainInvoices = invoices.filter(
      invoice => invoice.invoiceType === INVOICE_TYPE_ENUM.MONTHLY,
    );

    return mainInvoices;
  }

  static partitionServicesByDate(invoices: Populate<InvoiceMetaData, "mergedInvoices">[]): {
    _id: ID;
    uuid: string;
    name: string;
    amountBeforeDiscount: number;
    discount: number;
    amountAfterDiscount: number;
    newId: string;
    date: Date;
  }[] {
    const generatedService = this.generateServicesWithDate(invoices);
    return generatedService.map(service => {
      const { _id, name, amount, discount, newId, date } = service;
      const amountAfterDiscount = SchoolServicesService.applyDiscount(amount, discount);

      return {
        _id,
        uuid: RandomUtils.generateUUID(),
        name,
        amountBeforeDiscount: amount,
        amountAfterDiscount,
        discount,
        newId,
        date,
      };
    });
  }

  static generateServicesWithDate(
    invoices: Populate<InvoiceMetaData, "mergedInvoices">[],
  ): (StudentInvoiceService & { date: Date })[] {
    const extractedServicesWithDates = invoices.flatMap(invoice => {
      if (!invoice.isMerged) return { services: invoice.services, dates: invoice.dates };
      return invoice.mergedInvoices.map(mergedInvoice => ({
        services: mergedInvoice.services,
        dates: mergedInvoice.dates,
      }));
    });

    return extractedServicesWithDates.flatMap(({ services, dates }) =>
      services.flatMap(service => dates.map(date => ({ ...service, date }))),
    );
  }

  static ensureInvoiceCanBePrinted(invoice: Pick<Invoice, "status" | "paymentSplits">): void {
    const isInvoiceFullyPaid = invoice.status === INVOICE_STATUS_ENUM.PAID;
    const isPaymentSplitCountSufficient =
      invoice.paymentSplits.length >= this.MIN_NUMBER_OF_SPLITS_ALLOWED;

    const isAnySplitPaid = isPaymentSplitCountSufficient
      ? invoice.paymentSplits.some(paymentSplit => paymentSplit.status === INVOICE_STATUS_ENUM.PAID)
      : false;

    const isInvoiceCanBePrinted = isInvoiceFullyPaid || isAnySplitPaid;

    if (!isInvoiceCanBePrinted) throw new NotFoundError("invoice.cannotBePrinted");
  }

  static ensureSplitPaymentCanBeUnpaid(
    invoice: Pick<Invoice, "status" | "paymentSplits">,
    splitIndex: number,
  ): void {
    if (invoice.status === INVOICE_STATUS_ENUM.PAID)
      throw new BadRequestError("invoice.cannotBeUnPaid");

    if (splitIndex >= invoice.paymentSplits.length || splitIndex < 0) {
      throw new BadRequestError("invoice.cannotBeUnPaid");
    }
    const split = invoice.paymentSplits.at(splitIndex);

    if (!split || split.status !== INVOICE_STATUS_ENUM.PAID) {
      throw new BadRequestError("invoice.cannotBeUnPaid");
    }
  }

  static groupServicesByMonth(services: Invoice["services"]): {
    month: number;
    services: StudentServiceDto[];
  }[] {
    if (services.length === 0) return [];

    const serviceByMonth = groupBy(services, service => service.month);
    return Object.entries(serviceByMonth).map(([month, services]) => ({
      month: Number(month),
      services: services.map((service, i) => {
        const amountAfterDiscount = SchoolServicesService.applyDiscount(
          service.amount,
          service.discount,
        );
        return SchoolServiceMapper.toStudentServiceDto({
          ...service,
          amountAfterDiscount,
          index: i + 1,
        });
      }),
    }));
  }

  static getLastPaidSplitPayment(paymentSplit: Invoice["paymentSplits"]): {
    amount: number;
    index: number;
  } | null {
    if (paymentSplit.length === 0) return null;

    const paidPaymentSplitWithIndex = paymentSplit
      .map((split, index) => ({ ...split, index: index + 1 }))
      .filter(split => split.status === INVOICE_STATUS_ENUM.PAID);

    const sortedPaymentSplits = paidPaymentSplitWithIndex.sort((a, b) => {
      if (!a.paidAt || !b.paidAt) {
        throw new InternalError("Both payment splits must have a paidAt date.");
      }
      return b.paidAt.getTime() - a.paidAt.getTime();
    });

    return { amount: sortedPaymentSplits[0].amount, index: sortedPaymentSplits[0].index };
  }

  static calculateRemainingAmount(invoice: Pick<Invoice, "amount" | "paymentSplits">): number {
    const paidSplits = invoice.paymentSplits.filter(
      split => split.status === INVOICE_STATUS_ENUM.PAID,
    );

    const totalPaid = sumBy(paidSplits, split => split.amount);

    return invoice.amount - totalPaid;
  }

  static calculateInvoiceAmountBeforeDiscount(
    invoice: Pick<Invoice, "amount" | "discount">,
  ): number {
    //TODO need to review this logic
    return (100 * invoice.amount) / (100 - invoice.discount);
  }

  static ensureInvoicesCanBeMerged(invoices: Invoice[]): void {
    const isEveryInvoiceNotPaid = invoices.every(
      invoice => invoice.status !== INVOICE_STATUS_ENUM.PAID,
    );

    if (!isEveryInvoiceNotPaid) throw new BadRequestError("invoice.cannotBeMerged");
    const isEveryInvoiceNotMerged = invoices.every(invoice => invoice.isMerged === false);
    if (!isEveryInvoiceNotMerged) throw new BadRequestError("invoice.cannotBeMerged");
    const isEveryInvoiceNotPartialPaid = invoices.every(
      invoice => invoice.status !== INVOICE_STATUS_ENUM.PARTIALLY_PAID,
    );
    if (!isEveryInvoiceNotPartialPaid) throw new BadRequestError("invoice.cannotBeMerged");
    const isEveryInvoiceNotMergedIntoAnotherInvoice = invoices.every(
      invoice => invoice.mergedInto === null,
    );
    if (!isEveryInvoiceNotMergedIntoAnotherInvoice)
      throw new BadRequestError("invoice.cannotBeMerged");
  }

  static ensureInvoicesCanBeUnMerged(invoice: Invoice): void {
    if (!invoice.isMerged) throw new BadRequestError("invoice.cannotBeUnMerged");

    if (invoice.status === INVOICE_STATUS_ENUM.PAID)
      throw new BadRequestError("invoice.cannotBeUnMergedPaid");

    if (invoice.status === INVOICE_STATUS_ENUM.PARTIALLY_PAID)
      throw new BadRequestError("invoice.cannotBeUnMergedPartiallyPaid");
  }

  static ensureInvoiceCanBeUnpaid(invoice: Invoice): void {
    if (invoice.status != INVOICE_STATUS_ENUM.PAID) {
      throw new BadRequestError("invoice.cannotBeUnPaid");
    }
  }

  static calculateDiscountRate(amountBeforeDiscount: number, amountAfterDiscount: number): number {
    if (amountBeforeDiscount <= 0) {
      throw new BadRequestError("invoice.amountBeforeDiscountMustBePositive");
    }
    if (amountAfterDiscount < 0) {
      throw new BadRequestError("invoice.amountAfterDiscountCannotBeNegative");
    }
    return Math.round(((amountBeforeDiscount - amountAfterDiscount) / amountBeforeDiscount) * 100);
  }

  static determineStatus(invoices: Invoice[]): TInvoiceStatusEnum {
    const isSomeInvoicesOverdue = invoices.some(
      invoice => invoice.status === INVOICE_STATUS_ENUM.OVERDUE,
    );

    if (isSomeInvoicesOverdue) return INVOICE_STATUS_ENUM.OVERDUE;
    return INVOICE_STATUS_ENUM.UNPAID;
  }

  static determineInvoiceType(invoices: Invoice[]): TInvoiceTypeEnum {
    const isSomeInvoicesMonthly = invoices.some(
      invoice => invoice.invoiceType === INVOICE_TYPE_ENUM.MONTHLY,
    );
    const isSomeInvoicesOne = invoices.some(
      invoice => invoice.invoiceType === INVOICE_TYPE_ENUM.ONE_TIME,
    );
    if (isSomeInvoicesMonthly) return INVOICE_TYPE_ENUM.MONTHLY;

    if (isSomeInvoicesOne) return INVOICE_TYPE_ENUM.ONE_TIME;
    return INVOICE_TYPE_ENUM.EXTRA;
  }

  static ensureInvoiceCanBeUpdated(
    invoice: Pick<Invoice, "status" | "isMerged" | "mergedInto" | "services">,
    newServices: { id: ID }[],
  ): void {
    if (invoice.status === INVOICE_STATUS_ENUM.PAID) {
      throw new BadRequestError("invoice.cannotBeUpdated");
    }
    const newServicesIds = newServices.map(service => service.id);
    const oldServiceIds = invoice.services.map(service => service._id);
    const isContainsNewServices = difference(newServicesIds, oldServiceIds).length > 0;
    if (invoice.isMerged && isContainsNewServices)
      throw new BadRequestError("invoice.cannotBeUpdated");

    if (invoice.mergedInto) throw new BadRequestError("invoice.cannotBeUpdated");
  }

  static generateInvoicesPayload(data: {
    invoiceType: PickFromEnum<TInvoiceTypeEnum, "monthly" | "oneTime">;
    amount: number;
    studentInvoiceServices: Omit<StudentInvoiceService, "month">[];
    student: Populate<StudentMetaData, "level">;
    smsReminder: boolean;
    phoneNumber?: string;
    emailReminder: boolean;
    email?: string;
    discount: number;
    dates: Date[];
    schoolDueDate: number;
  }): Omit<Invoice, keyof BaseEntity>[] {
    const {
      invoiceType,
      amount,
      studentInvoiceServices,
      dates,
      schoolDueDate,
      student,
      discount,
      smsReminder,
      phoneNumber,
      emailReminder,
      email,
    } = data;

    let scheduledPaymentDates: { date: Date; dueDate: Date }[];
    if (invoiceType === SERVICE_TYPE_ENUM.ONE_TIME) {
      //One Time Invoice Always has one date
      const date = dates.at(0);
      if (!date) throw new BadRequestError("One-time invoice requires a date");
      const dueDate = SchoolServicesService.calculateOneTimeDueDate(date);
      scheduledPaymentDates = [{ date, dueDate }];
    } else if (invoiceType === SERVICE_TYPE_ENUM.MONTHLY) {
      scheduledPaymentDates = dates.map(date => {
        const dueDate = SchoolServicesService.calculateMonthlyDueDate(date, schoolDueDate);
        return { date, dueDate };
      });
    } else {
      throw new BadRequestError("Invalid invoice type");
    }

    const invoicePayloads: Omit<Invoice, keyof BaseEntity>[] = scheduledPaymentDates.map(
      ({ date, dueDate }) => ({
        invoiceType,
        status: INVOICE_STATUS_ENUM.UNPAID,
        services: studentInvoiceServices.map(service => ({
          ...service,
          month: date.getMonth(),
        })),
        discount,
        students: [{ student: student._id, schoolYear: student.level.currentSchoolYear._id }],
        dates: [date],
        dueDate,
        smsReminder,
        phoneNumber: phoneNumber || null,
        emailReminder,
        email: email || null,
        amount,
        levels: [student.level._id],
        paymentSplits: [],
        adminIdPaidBy: null,
        adminIdUnPaidBy: null,
        unPaidAt: null,
        paidAt: null,
        parent: null,
        remindedByEmailAt: null,
        remindedByPhoneAt: null,
        mergedInvoices: [],
        mergedInto: null,
        isMerged: false,
        mergedBy: null,
        paymentMethod: null,
      }),
    );
    return invoicePayloads;
  }

  static checkSplitsAmount = (
    sumOfServicesAmount: number,
    sumOfAmounts: number,
    discount: number,
  ): boolean => {
    const sumOfServicesAmountRounded = Math.round(sumOfServicesAmount * 100) / 100;

    const sumOfServicesAmountAfterTotalDiscount =
      sumOfServicesAmountRounded - (discount * sumOfServicesAmountRounded) / 100;

    const epsilon = 0.001;
    const amountsAreEqual =
      Math.abs(sumOfAmounts - sumOfServicesAmountAfterTotalDiscount) < epsilon;

    return amountsAreEqual;
  };

  static ensureSplitsPaymentCanBeUpdated(
    invoice: Pick<Invoice, "paymentSplits">,
    totalServiceAmount: number,
    newInvoiceDiscount: number,
    newSplits?: {
      amount: number;
      dueDate: Date;
      paymentMethod: string;
      status: TSplitsStatusEnum;
    }[],
  ): void {
    if (!newSplits || newSplits.length === 0) return;

    const isSomeSplitPaymentAlreadyPaid = invoice.paymentSplits.some(
      split => split.status === INVOICE_STATUS_ENUM.PAID,
    );
    if (isSomeSplitPaymentAlreadyPaid) {
      throw new BadRequestError("invoice.cannotDeleteAllSplitWithExistingPaidSplits");
    }

    if (newSplits.length < this.MIN_NUMBER_OF_SPLITS_ALLOWED)
      throw new BadRequestError("invoice.splitsCountNotValid");
    const newSplitsAmounts = sumBy(newSplits, split => split.amount);

    const isSplitAmountValid = this.checkSplitsAmount(
      totalServiceAmount,
      newSplitsAmounts,
      newInvoiceDiscount,
    );
    if (!isSplitAmountValid) throw new BadRequestError("invoice.splitsAmountNotValid");
  }
}
