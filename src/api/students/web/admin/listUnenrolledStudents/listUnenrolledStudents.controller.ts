import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { BadRequestError } from "../../../../../core/ApplicationErrors";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ClassRepo } from "../../../../../feature/classes/domain/Class.repo";
import { ClassTypeRepo } from "../../../../../feature/classTypes/repo/ClassType.repo";
import { StudentRepo } from "../../../../../feature/students/domain/Student.repo";
import { ID } from "../../../../../types/BaseEntity";
import {
  ListUnenrolledStudentsResponse,
  ListUnenrolledStudentsRouteConfig,
} from "./listUnenrolledStudents.types";

@Controller()
export class ListUnenrolledStudentsController extends BaseController<ListUnenrolledStudentsRouteConfig> {
  constructor(
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
  ) {
    super();
  }

  async main(req: TypedRequest<ListUnenrolledStudentsRouteConfig>): Promise<void | APIResponse> {
    let classTypeId: ID | undefined = undefined;
    let schoolYearId: ID | undefined = undefined;

    if (req.query.classNewId) {
      const classDoc = await this.classRepo.findOneByNewIdOrThrow(
        req.query.classNewId,
        "notFound.class",
      );

      classTypeId = classDoc.classType;
      schoolYearId = classDoc.schoolYear;
    }

    if (req.query.classTypeNewId) {
      const classTypeDoc = await this.classTypeRepo.findOneByNewIdOrThrow(
        req.query.classTypeNewId,
        "notFound.classType",
        { populate: ["subLevel"] },
      );

      classTypeId = classTypeDoc._id;
      schoolYearId = classTypeDoc.subLevel.level.currentSchoolYear._id;
    }

    if (!classTypeId || !schoolYearId) throw new BadRequestError("global.badRequest");

    const data = await this.studentRepo.listUnenrolledStudents(
      {
        search: req.query.search,
        classTypeId,
        schoolYearId,
      },
      {
        page: req.query.page,
        limit: req.query.limit,
      },
    );

    const response = {
      ...data,
      docs: data.docs.map(student => ({
        _id: student._id,
        newId: student.newId,
        fullName: student.fullName,
        avatar: student.avatar.link,
        gender: student.gender,
        email: student.email,
        phoneNumber: student.phoneNumber,
      })),
    };

    return new SuccessResponse<ListUnenrolledStudentsResponse>(
      "global.listSuccessfullyRetrieved",
      response,
    );
  }
}
