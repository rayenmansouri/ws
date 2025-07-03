import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ClassRepo } from "../../../../../feature/classes/domain/Class.repo";
import { ClassTypeRepo } from "../../../../../feature/classTypes/repo/ClassType.repo";
import { LevelRepo } from "../../../../../feature/levels/repos/Level.repo";
import { ID } from "../../../../../types/BaseEntity";
import { ListClassesRouteConfig, ListClassesResponse } from "./listClasses.types";

@Controller()
export class ListClassesController extends BaseController<ListClassesRouteConfig> {
  constructor(
    @inject("LevelRepo") private levelRepo: LevelRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
  ) {
    super();
  }

  async main(req: TypedRequest<ListClassesRouteConfig>): Promise<APIResponse> {
    let schoolYearIds: ID[] | undefined;
    let classTypeIds: ID[] | undefined;

    if (req.query.levels) {
      const levels = await this.levelRepo.findManyByNewIdsOrThrow(
        req.query.levels,
        "notFound.level",
      );
      schoolYearIds = levels.map(level => level.currentSchoolYear._id);
    }

    if (req.query.classTypes) {
      const classTypes = await this.classTypeRepo.findManyByNewIdsOrThrow(
        req.query.classTypes,
        "notFound.classType",
      );

      classTypeIds = classTypes.map(classType => classType._id);
    }

    const data = await this.classRepo.listClasses(
      {
        search: req.query.search,
        classType: classTypeIds,
        schoolYears: schoolYearIds,
      },
      {
        limit: req.query.limit,
        page: req.query.page,
      },
    );

    const response = {
      ...data,
      docs: data.docs.map(doc => ({
        _id: doc._id,
        name: doc.name,
        newId: doc.newId,
      })),
    };

    return new SuccessResponse<ListClassesResponse>("global.listSuccessfullyRetrieved", response);
  }
}
