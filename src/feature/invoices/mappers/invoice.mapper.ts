import { ListInvoicesResponse } from "../../../api/invoices/web/admin/listInvoices/listInvoices.types";
import { InternalError } from "../../../core/ApplicationErrors";
import { Populate } from "../../../core/populateTypes";
import { RandomUtils } from "../../../helpers/RandomUtils";
import { Class } from "../../classes/domain/class.entity";
import { StudentServiceDto } from "../../finance/dtos/SchoolService.dto";
import { Parent } from "../../parents/domain/parent.entity";
import { School } from "../../schools/domain/school.entity";
import { SchoolMapper } from "../../schools/mappers/School.mapper";
import {
  Invoice,
  INVOICE_STATUS_ENUM,
  InvoiceMetaData,
} from "../../studentPayments/domain/invoice.entity";
import { InvoiceService } from "../../studentPayments/domain/Invoice.service";
import { Student, StudentMetaData } from "../../students/domain/student.entity";
import { StudentService } from "../../students/domain/Student.service";
import { UserMapper } from "../../users/mappers/User.mapper";
import {
  InvoiceDetailsDto,
  InvoiceDto,
  InvoiceExportDto,
  InvoicePdfDataDto,
  InvoiceSearchDto,
} from "../dtos/invoice.dto";

export class InvoiceMapper {
  static toInvoiceDto(
    invoices: Omit<Invoice, "students"> & {
      students: { student: Populate<StudentMetaData, "parents"> }[];
    },
  ): InvoiceDto {
    const students = invoices.students.map(student => student.student);
    const commonParents = StudentService.getCommonParents(students);
    const parentDtos = commonParents.map(UserMapper.toUserProfileDTO);
    const studentDtos = students.map(UserMapper.toUserProfileDTO);

    return {
      students: studentDtos,
      parents: parentDtos,
      newId: invoices.newId,
      invoiceType: invoices.invoiceType,
      status: invoices.status,
      services: invoices.services.map(service => ({
        name: service.name,
        amount: service.amount,
        month: service.month,
      })),
      splits: InvoiceMapper.toPaymentSplitDto(invoices),
      servicesCount: invoices.services.length,
      dates: invoices.dates,
      _id: invoices._id,
      isMerged: invoices.isMerged,
      isPartiallyPaid: invoices.status === INVOICE_STATUS_ENUM.PARTIALLY_PAID,
      amount: invoices.amount,
      dueDate: invoices.dueDate,
      paidAt: invoices.paidAt || null,
    };
  }

  static toStudentInvoiceDto(
    oneTimeInvoices: InvoiceDto[],
    mainInvoices: InvoiceDto[],
  ): { oneTimeInvoices: InvoiceDto[]; mainInvoices: InvoiceDto[] } {
    return {
      oneTimeInvoices: oneTimeInvoices,
      mainInvoices: mainInvoices,
    };
  }

  static toInvoiceSearchDto(data: {
    classDocs: Class | null;
    students: Student | null;
    parents: Parent | null;
  }): InvoiceSearchDto {
    if (!data.classDocs && !data.students && !data.parents) {
      throw new InternalError("At least one of classDocs, students, or parents must be provided");
    }
    const avatar = data.students?.avatar || data.parents?.avatar || null;
    const name = data.students?.fullName || data.parents?.fullName || data.classDocs!.name;
    const _id = data.students?._id || data.parents?._id || data.classDocs!._id;
    const type = data.students ? "student" : data.parents ? "parent" : "class";
    const newId = data.students?.newId || data.parents?.newId || data.classDocs!.newId;
    return { _id, newId, avatar: avatar?.link || null, name, type };
  }

  static toInvoiceDetailsDto(data: {
    invoice: Populate<InvoiceMetaData, "mergedInvoices">;
    students: Populate<StudentMetaData, "parents">[];
    school: School;
  }): InvoiceDetailsDto {
    const { invoice, students, school } = data;
    const invoiceInformation = this.toInvoiceInformationDto({
      ...invoice,
      students,
    });

    const children = students.map(UserMapper.toUserProfileDTO);
    const reminders = {
      email: invoice.email,
      sms: invoice.phoneNumber,
    };
    const statuses = {
      isMerged: invoice.isMerged,
      isOverdue: invoice.status === INVOICE_STATUS_ENUM.OVERDUE,
      isPaid: invoice.status === INVOICE_STATUS_ENUM.PAID,
      isPartiallyPaid: invoice.status === INVOICE_STATUS_ENUM.PARTIALLY_PAID,
    };

    return {
      status: invoice.status,
      isMerged: invoice.isMerged,
      invoiceInformation,
      children,
      reminders,
      statuses,
      services: InvoiceService.partitionServicesByDate([invoice]),
      amount: InvoiceMapper.toAmountDetails(invoice, school),
      splits: InvoiceMapper.toPaymentSplitDto(invoice),
      unMergePreview: InvoiceMapper.getUnMergedPreview(invoice, students),
    };
  }

  static toInvoicePdfDataDto(data: {
    invoice: Populate<InvoiceMetaData, "students.student" | "parent">;
    lastPaidSplit: { index: number; amount: number } | null;
    students: { name: string; className: string | null }[];
    services: { month: number; services: StudentServiceDto[] }[];
    amountBeforeDiscount: number;
    school: School;
    dueAmount: number | null;
  }): InvoicePdfDataDto {
    return {
      invoice: {
        newId: data.invoice.newId,
        paidAt: data.invoice.paidAt,
        dueDate: data.invoice.dueDate,
        paymentMethod: data.invoice.paymentMethod!,
        dates: data.invoice.dates,
        isMerged: data.invoice.isMerged,
        invoiceType: data.invoice.invoiceType,
        status: data.invoice.status,
        lastSplitPaid: data.lastPaidSplit,
      },
      services: data.services,
      parent: {
        ...UserMapper.toUserProfileDTO(data.invoice.parent!),
        address: data.invoice.parent?.address1 || "",
      },
      students: data.students,
      total: {
        amountAfterDiscount: data.amountBeforeDiscount,
        amountBeforeDiscount: data.invoice.amount,
        discount: data.invoice.discount.toFixed(2),
        taxRate: data.school.taxRate,
        dueAmount: data.dueAmount,
      },
      schoolInformation: {
        ...SchoolMapper.toSchoolDTO(data.school),
        currency: data.school.currency,
      },
      splits: InvoiceMapper.toPaymentSplitDto(data.invoice),
    };
  }

  static toInvoiceExportDto(data: ListInvoicesResponse["docs"][0]): InvoiceExportDto {
    const parents = data.parents.map(parent => parent.fullName).join(", ");
    const students = data.students.map(student => student.fullName).join(", ");
    const dates = data.dates.map(date => new Date(date).toLocaleDateString("fr")).join(", ");
    const paidAt = data.paidAt?.toLocaleString("fr") || "-";
    return {
      _id: data._id,
      newId: data.newId,
      students,
      parents,
      dates: dates,
      paidAt,
      amount: data.amount.toFixed(2),
      status: data.status,
      invoiceType: data.invoiceType,
    };
  }

  private static toInvoiceInformationDto(
    invoice: Pick<
      Invoice,
      "newId" | "dueDate" | "createdAt" | "paidAt" | "paymentMethod" | "invoiceType"
    > & { students: Populate<StudentMetaData, "parents">[] },
  ): InvoiceDetailsDto["invoiceInformation"] {
    const commonParents = StudentService.getCommonParents(invoice.students);
    const parents = commonParents.map(parent => UserMapper.toUserProfileDTO(parent));

    return {
      newId: invoice.newId,
      dueDate: invoice.dueDate,
      creationDate: invoice.createdAt,
      paidAt: invoice.paidAt,
      paymentMethod: invoice.paymentMethod,
      invoiceType: invoice.invoiceType,
      parents,
    };
  }

  private static toPaymentSplitDto(
    invoice: Pick<Invoice, "paymentSplits">,
  ): InvoiceDetailsDto["splits"] {
    return invoice.paymentSplits.map((split, index) => ({
      amount: split.amount,
      dueDate: split.dueDate,
      paymentMethod: split.paymentMethod,
      status: split.status,
      index: index + 1,
      id: RandomUtils.generateUUID(),
      paidAt: split.paidAt,
    }));
  }

  private static toAmountDetails(
    invoice: Pick<Invoice, "amount" | "discount">,
    school: School,
  ): InvoiceDetailsDto["amount"] {
    const taxRate = school.taxRate;
    return {
      TVAFees: invoice.amount * (taxRate / 100),
      amount: invoice.amount,
      discount: invoice.discount,
      taxRate: taxRate,
    };
  }

  private static getUnMergedPreview(
    invoice: Populate<InvoiceMetaData, "mergedInvoices">,
    students: Populate<StudentMetaData, "parents">[],
  ): InvoiceDetailsDto["unMergePreview"] {
    if (!invoice.isMerged) return [];

    return invoice.mergedInvoices.flatMap(mergedInvoice => {
      return mergedInvoice.dates.flatMap(date => {
        return mergedInvoice.students.flatMap(studentAndSchoolYear => {
          const student = students.find(student => student._id === studentAndSchoolYear.student);
          if (!student) throw new InternalError("Student information must be provided");

          return {
            student: UserMapper.toUserProfileDTO(student),
            invoice: { newId: mergedInvoice.newId, month: date.getMonth() },
            amount: mergedInvoice.amount,
          };
        });
      });
    });
  }
}
