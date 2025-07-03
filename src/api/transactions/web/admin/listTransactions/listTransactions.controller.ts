import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseExportController } from "../../../../../core/express/controllers/ExportController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { TransactionRepo } from "../../../../../feature/transactions/transaction.repo";
import { ListTransactionsResponse, ListTransactionsRouteConfig } from "./listTransactions.types";

@Controller()
export class ListTransactionsController extends BaseExportController<
  ListTransactionsRouteConfig,
  ListTransactionsResponse
> {
  constructor(@inject("TransactionRepo") private transactionRepo: TransactionRepo) {
    super();
  }

  async main(req: TypedRequest<ListTransactionsRouteConfig>): Promise<APIResponse> {
    const data = await this.transactionRepo.listTransactions(
      {
        search: req.query.search,
        transactionType: req.query.transactionType,
        level: req.query.level,
      },
      {
        page: req.query.page,
        limit: req.query.limit,
      },
    );

    const response = {
      ...data,
      docs: data.docs.map(doc => ({
        _id: doc._id,
        name: doc.name,
        description: doc.description,
        amount: doc.amount,
        transactionType: doc.transactionType,
        paidAt: doc.paidAt,
        level: {
          _id: doc.level._id,
          name: doc.level.name,
        },
        supplier: doc.supplier
          ? {
              _id: doc.supplier._id,
              newId: doc.supplier.newId,
              name: doc.supplier.name,
            }
          : null,
        createdBy: {
          _id: doc.admin._id,
          newId: doc.admin.newId,
          fullName: doc.admin.fullName,
          avatar: doc.admin.avatar.link,
          role: doc.admin.roles[0].name,
        },
        createdAt: doc.createdAt,
      })),
    };

    return new SuccessResponse<ListTransactionsResponse>(
      "global.listSuccessfullyRetrieved",
      response,
    );
  }

  formatDataBeforeExport(data: ListTransactionsResponse): Array<{
    _id: string;
    name: string;
    amount: string;
    transactionType: string;
    level: string;
    paidAt: string;
    supplier: string;
    createdAt: string;
    createdBy: string;
  }> {
    return data.docs.map(doc => ({
      _id: doc._id,
      name: doc.name,
      amount: doc.amount.toString(),
      transactionType: doc.transactionType,
      level: doc.level.name,
      paidAt: doc.paidAt.toLocaleDateString("fr"),
      supplier: doc.supplier?.name || "-",
      createdAt: doc.createdAt.toLocaleDateString("fr"),
      createdBy: doc.createdBy.fullName,
    }));
  }
}
