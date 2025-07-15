import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { SupplierRepo } from "../../../../../feature/supplier/Supplier.repo";
import { SupplierService } from "../../../../../feature/supplier/Supplier.service";
import { DeleteSuppliersRouteConfig } from "./deleteSuppliers.types";

@Controller()
export class DeleteSuppliersController extends BaseController<DeleteSuppliersRouteConfig> {
  constructor(
    @inject("SupplierRepo") private supplierRepo: SupplierRepo,
    @inject("SupplierService") private supplierService: SupplierService,
  ) {
    super();
  }

  async main(req: TypedRequest<DeleteSuppliersRouteConfig>): Promise<void | APIResponse> {
    const suppliers = await this.supplierRepo.findManyByNewIdsOrThrow(
      req.body.newIds,
      "notFound.supplier",
    );

    const supplierIds = suppliers.map(supplier => supplier._id);

    await this.supplierService.deleteSuppliers(supplierIds);

    return new SuccessResponse("supplier.deletedSuccessfully");
  }
}
