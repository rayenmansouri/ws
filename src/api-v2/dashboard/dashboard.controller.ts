import { Injectable } from "../../core/container/decorators/AutoRegister.decorator";
import { BaseController } from "../../core/express/controllers/BaseController";
import { TypedRequest } from "../../core/express/types";
import { APIResponse } from "../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../core/responseAPI/APISuccessResponse";
import { GetDashboardResponse, GetDashboardRouteConfig } from "./dashboard.types";

@Injectable({
    identifier: "DashboardController",
})
export class DashboardController extends BaseController<GetDashboardRouteConfig> {
    constructor() {
        super();
    }

    async main(req: TypedRequest): Promise<void | APIResponse> {
        return new SuccessResponse<GetDashboardResponse>("global.success", { 
            totalClasses: 0,
            totalStudentsCount: 0,
            unaffectedStudentsCount: 0,
            affectedStudentsCount: 0,
            totalParents: 0,
            totalTeachers: 0,
            staffCount: 0,
            levels: [],
            subLevels: [],
         });
    }
}