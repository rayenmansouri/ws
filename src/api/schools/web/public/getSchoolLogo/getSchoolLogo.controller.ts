import axios from "axios";
import { Response } from "express";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { schoolDocStore } from "../../../../../core/subdomainStore";
import { GetSchoolLogoRouteConfig } from "./getSchoolLogo.types";

@Controller()
export class GetSchoolLogoController extends BaseController<GetSchoolLogoRouteConfig> {
  constructor() {
    super();
  }

  async main(req: TypedRequest<GetSchoolLogoRouteConfig>, res: Response): Promise<void> {
    const logoUrl = schoolDocStore[req.params.schoolId].logo;

    if (!logoUrl) {
      res.sendStatus(404);
      return;
    }

    const response = await axios.get(logoUrl, { responseType: "stream" });
    response.data.pipe(res);
  }
}
