import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseExportController } from "../../../../../core/express/controllers/ExportController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ClassTypeRepo } from "../../../../../feature/classTypes/repo/ClassType.repo";
import { StudentRepo } from "../../../../../feature/students/domain/Student.repo";
import { omitObject } from "../../../../../helpers/omitObject";
import { ID } from "../../../../../types/BaseEntity";
import { ListStudentsResponse, ListStudentsRouteConfig } from "./listStudents.types";

@Controller()
export class ListStudentsController extends BaseExportController<
  ListStudentsRouteConfig,
  ListStudentsResponse
> {
  constructor(
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
  ) {
    super();
  }

  async main(req: TypedRequest<ListStudentsRouteConfig>): Promise<APIResponse> {
    let classTypeIds: ID[] | undefined = undefined;

    if (req.query.classTypeNewIds) {
      const classType = await this.classTypeRepo.findManyByNewIdsOrThrow(
        req.query.classTypeNewIds,
        "notFound.classType",
      );
      classTypeIds = classType.map(classType => classType._id);
    }

    const data = await this.studentRepo.listStudents(
      {
        search: req.query.search,
        gender: req.query.gender,
        level: req.query.level,
        classTypeIds: classTypeIds,
        isArchived: req.query.isArchived,
      },
      {
        page: req.query.page,
        limit: req.query.limit,
      },
    );

    const response = {
      ...data,
      docs: data.docs.map(student => ({
        ...omitObject(student, ["password", "passwordChangedAt"]),
        avatar: student.avatar.link,
      })),
    };

    return new SuccessResponse<ListStudentsResponse>("global.listSuccessfullyRetrieved", response);
  }

  formatDataBeforeExport(data: ListStudentsResponse): Array<{
    firstName: string;
    lastName: string;
    gender: string;
    address1: string;
    phoneNumber: string;
    birthDate: string;
    level: string;
    classType: string;
    parents: string;
    newId: string;
    fullName: string;
    uniqueId: string;
    parentPhoneNumber: string;
  }> {
    return data.docs.map(student => ({
      firstName: student.firstName,
      lastName: student.lastName,
      gender: student.gender,
      address1: student.address1 || "-",
      phoneNumber: student.phoneNumber || "-",
      classType: student.classType?.name,
      birthDate: student.birthDate?.toLocaleDateString("fr") || "-",
      level: student.level.name,
      parents: student.parents.map(parent => parent.fullName).join(", "),
      uniqueId: student.uniqueId || "-",
      newId: student.newId,
      fullName: student.fullName,
      parentPhoneNumber: student.parents[0]?.phoneNumber || "-",
    }));
  }
}
