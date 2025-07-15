import { BarCodeConfigDto } from "../../../../../feature/barCode/dtos/barCodeConfig.dto";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListBarCodeConfigValidation } from "./listBarCodeConfig.validation";

export type ListBarCodeConfigRouteConfig = ListBarCodeConfigValidation & { files: never };
export type ListBarCodeConfigResponse = ResponseWithPagination<BarCodeConfigDto>;
