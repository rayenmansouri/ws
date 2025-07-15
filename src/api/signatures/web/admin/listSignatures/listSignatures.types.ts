import { SignatureDto } from "../../../../../feature/signatures/dtos/signature.dto";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListSignaturesValidation } from "./listSignatures.validation";

export type ListSignaturesRouteConfig = ListSignaturesValidation & { files: never };
export type ListSignaturesResponse = ResponseWithPagination<SignatureDto>;
