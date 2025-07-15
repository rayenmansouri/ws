import { MergeInvoicesValidation } from "./mergeInvoices.validation";

export type MergeInvoicesRouteConfig = MergeInvoicesValidation & { files: never };
export type MergeInvoicesResponse = { newId: string };
