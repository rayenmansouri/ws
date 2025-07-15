import { injectable } from "inversify";
import { EMPTY_RESPONSE_WITH_PAGINATION } from "../../../constants/emptyResponseWithPagination";
import { inject } from "../../../core/container/TypedContainer";
import { TInvoiceStatusEnum } from "../../../database/schema/finance/Invoice.schema";
import { paginateResult } from "../../../helpers/paginateResult";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ID } from "../../../types/BaseEntity";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { ParentRepo } from "../../parents/domain/Parent.repo";
import { TInvoiceTypeEnum, TPaymentMethodsEnum } from "../../studentPayments/domain/invoice.entity";
import { InvoiceRepo } from "../../studentPayments/domain/Invoice.repo";
import { StudentRepo } from "../../students/domain/Student.repo";
import { InvoiceDto } from "../dtos/invoice.dto";
import { InvoiceMapper } from "../mappers/invoice.mapper";

export type ListInvoicesRequestDTO = {
  query: {
    month?: number[];
    invoiceType?: TInvoiceTypeEnum;
    paymentMethod?: TPaymentMethodsEnum;
  };

  search: {
    searchNewId?: string;
    searchType?: "student" | "parent" | "class";
    status?: TInvoiceStatusEnum;
  };

  pagination: {
    page?: number;
    limit?: number;
  };
};

@injectable()
export class ListInvoicesUseCase {
  constructor(
    @inject("StudentRepo") private readonly studentRepo: StudentRepo,
    @inject("ParentRepo") private readonly parentRepo: ParentRepo,
    @inject("ClassRepo") private readonly classRepo: ClassRepo,
    @inject("InvoiceRepo") private readonly invoiceRepo: InvoiceRepo,
  ) {}

  async execute(dto: ListInvoicesRequestDTO): Promise<ResponseWithPagination<InvoiceDto>> {
    const studentIds: ID[] = [];

    if (dto.search.searchNewId && dto.search.searchType === "student") {
      const student = await this.studentRepo.findOneByNewIdOrThrow(
        dto.search.searchNewId,
        "notFound.student",
      );

      studentIds.push(student._id);
    }

    if (dto.search.searchNewId && dto.search.searchType === "parent") {
      const parent = await this.parentRepo.findOneByNewIdOrThrow(
        dto.search.searchNewId,
        "notFound.parent",
      );

      studentIds.push(...parent.students);
    }

    if (dto.search.searchNewId && dto.search.searchType === "class") {
      const classDoc = await this.classRepo.findOneByNewIdOrThrow(
        dto.search.searchNewId,
        "notFound.class",
      );

      studentIds.push(...classDoc.students);
    }

    const months = dto.query?.month || null;
    const paymentMethod = dto.query?.paymentMethod || null;
    const invoiceType = dto.query?.invoiceType || null;
    const status = dto.search?.status || null;
    const searchType = dto.search.searchType || null;

    const invoices = await this.invoiceRepo.listStudentsInvoices(
      studentIds,
      months,
      paymentMethod,
      invoiceType,
      status,
      searchType,
    );
    const sortedInvoices = invoices.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    if (dto.pagination.page) {
      const paginatedResult = paginateResult(
        sortedInvoices,
        dto.pagination.limit,
        dto.pagination.page,
      );

      const mappedResult = paginatedResult.docs.map(InvoiceMapper.toInvoiceDto);
      return {
        docs: mappedResult,
        meta: paginatedResult.meta,
      };
    } else {
      return {
        docs: sortedInvoices.map(InvoiceMapper.toInvoiceDto),
        meta: EMPTY_RESPONSE_WITH_PAGINATION<InvoiceDto>().meta,
      };
    }
  }
}
