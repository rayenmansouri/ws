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
              "affectedStudentsCount": 1,
              "unaffectedStudentsCount": 10,
              "totalTeachers": 33,
              "totalStudentsCount": 11,
              "totalParents": 0,
              "totalClasses": 14,
              "staffCount": 0,
              "levels": [
                {
                  "_id": "level_1",
                  "name": "Level 1"
                },
                {
                  "_id": "level_2",
                  "name": "Level 2"
                },
                {
                  "_id": "level_3",
                  "name": "Level 3"
                }
              ],
              "tabStats": {
                "chartData": [
                  {
                    "name": "present",
                    "data": [0, 0, 0, 0, 0, 0]
                  },
                  {
                    "name": "absent",
                    "data": [0, 0, 0, 0, 0, 0]
                  },
                  {
                    "name": "late",
                    "data": [0, 0, 0, 0, 0, 0]
                  },
                  {
                    "name": "exempted",
                    "data": [0, 0, 0, 0, 0, 0]
                  }
                ],
                "tableData": [
                  {
                    "_id": 0,
                    "totalTeenagers": 6
                  },
                  {
                    "_id": 1,
                    "totalTeenagers": 4
                  },
                  {
                    "_id": 2,
                    "totalTeenagers": 1
                  },
                  {
                    "_id": 3,
                    "totalTeenagers": 4
                  },
                  {
                    "_id": 4,
                    "totalTeenagers": 14
                  },
                  {
                    "_id": 5,
                    "totalTeenagers": 1
                  },
                  {
                    "_id": 6,
                    "totalTeenagers": 3
                  }
                ]
            }
          })
    }
}