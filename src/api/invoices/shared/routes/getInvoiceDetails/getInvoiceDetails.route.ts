import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { GetInvoiceDetailsController } from "./getInvoiceDetails.controller";
import { GetInvoiceDetailsRouteConfig } from "./getInvoiceDetails.types";
import { getInvoiceDetailsValidation } from "./getInvoiceDetails.validation";

registerSharedRoute<GetInvoiceDetailsRouteConfig>()(
  {
    path: "/invoices/:invoiceNewId",
    method: "get",
    paramSchema: getInvoiceDetailsValidation.params,
    controller: GetInvoiceDetailsController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.PARENT,
      platforms: ["web", "mobile"],
    },
  ],
);
