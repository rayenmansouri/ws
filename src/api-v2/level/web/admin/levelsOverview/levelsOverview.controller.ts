import { Injectable } from "../../../../../core/container/decorators/AutoRegister.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { LevelsOverviewRouteConfig, LevelsOverviewResponse } from "./levelsOverview.types";

@Injectable({ identifier: "LevelsOverviewController" })
export class LevelsOverviewController extends BaseController<LevelsOverviewRouteConfig> {
  async main(_: TypedRequest<LevelsOverviewRouteConfig>): Promise<void | APIResponse> {
    // Mock response matching the response type
    const mockLevelsOverview: LevelsOverviewResponse = [
      {
        _id: "mock-level-1" as string & { _isID: true },
        name: "Primary Level",
        newId: "PL001",
        color: "#FF6B6B",
        subLevelsOverview: [
          {
            subLevel: {
              _id: "mock-sublevel-1" as string & { _isID: true },
              name: "Grade 1",
              newId: "G1"
            },
            classNumber: 5,
            studentNumber: 120,
            teacherNumber: 8
          }
        ]
      }
    ];
    
    return new SuccessResponse<LevelsOverviewResponse>("global.success", mockLevelsOverview);
  }
}
