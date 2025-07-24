import axios from "axios";
import { Response } from "express";
import { container } from "../../../../../core/container/container";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { schoolDocStore } from "../../../../../core/subdomainStore";
import { getNewTenantConnection } from "../../../../../database/connectionDB/tenantPoolConnection";
import { GetSchoolSignatureRouteConfig } from "./getSchoolSignature.types";

@Controller()
export class GetSchoolSignatureController extends BaseController<GetSchoolSignatureRouteConfig> {
  constructor() {
    super();
  }

  async main(
    req: TypedRequest<GetSchoolSignatureRouteConfig>,
    res: Response,
  ): Promise<void | APIResponse> {
    const childContainer = container.createChild();
    const school = schoolDocStore[req.params.schoolId];
    if (!school) {
      res.sendStatus(404);
      return;
    }

    const connection = await getNewTenantConnection(school.subdomain);
    childContainer.bind("Connection").toConstantValue(connection);

    const signatureUrl = school.financeSignature?.link;

    if (!signatureUrl) {
      res.sendStatus(404);
      return;
    }

    const response = await axios.get(signatureUrl, { responseType: "stream" });
    response.data.pipe(res);
  }
}
