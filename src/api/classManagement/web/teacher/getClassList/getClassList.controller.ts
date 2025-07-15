import { uniq } from "lodash";
import { InternalError } from "../../../../../core/ApplicationErrors";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { Populate } from "../../../../../core/populateTypes";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { Class } from "../../../../../feature/classes/domain/class.entity";
import { ClassService } from "../../../../../feature/classes/domain/Class.service";
import { ClassTypeMetaData } from "../../../../../feature/classTypes/repo/classType.entity";
import { ClassTypeRepo } from "../../../../../feature/classTypes/repo/ClassType.repo";
import { GroupApplicationService } from "../../../../../feature/groupManagement/applicationServices/Group.application.service";
import { GroupMetaData } from "../../../../../feature/groupManagement/domains/group.entity";
import { Student } from "../../../../../feature/students/domain/student.entity";
import { StudentRepo } from "../../../../../feature/students/domain/Student.repo";
import { Teacher } from "../../../../../feature/teachers/domain/teacher.entity";
import { UserMapper } from "../../../../../feature/users/mappers/User.mapper";
import { isIdsEqual, isIncludeArrayIds } from "../../../../../helpers/functionsUtils";
import { GetClassListResponse, GetClassListRouteConfig } from "./getClassList.types";

@Controller()
export class GetClassListController extends BaseController<GetClassListRouteConfig> {
  constructor(
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("ClassService") private classService: ClassService,
    @inject("GroupApplicationService")
    private groupApplicationService: GroupApplicationService,
  ) {
    super();
  }

  async main(req: TypedRequest<GetClassListRouteConfig>): Promise<void | APIResponse> {
    const teacher = req.user as unknown as Teacher;

    const classDocs = await this.classService.getTeacherClasses(teacher);

    const groupDocs = await this.groupApplicationService.getTeacherGroups(teacher);

    const studentClassIds = classDocs.flatMap(doc => doc.students.slice(0, 4));

    const studentGroupIds = groupDocs.flatMap(doc => doc.students.slice(0, 4));

    const studentIds = uniq([...studentClassIds, ...studentGroupIds]);

    const students = await this.studentRepo.findManyByIds(studentIds);

    const classTypeIds = classDocs.map(classDoc => classDoc.classType);

    const classTypesDocs = await this.classTypeRepo.findManyByIds(classTypeIds, {
      populate: ["subLevel"],
    });

    const response = this.formatResponse(classDocs, classTypesDocs, students, groupDocs);

    return new SuccessResponse("class.classReturnedSuccessfully", response);
  }

  private formatResponse(
    classDocs: Class[],
    classTypesDocs: Populate<ClassTypeMetaData, "subLevel">[],
    students: Student[],
    groups: Populate<GroupMetaData, "classTypes">[],
  ): GetClassListResponse {
    const classList: GetClassListResponse["classes"] = classDocs.map(doc => {
      const classType = classTypesDocs.find(classType => isIdsEqual(classType._id, doc.classType));
      if (!classType) throw new InternalError(`Class Type not found of this class id ${doc._id}`);
      const studentIdsInClass = doc.students.slice(0, 4);

      const studentsClass = students
        .filter(student => isIncludeArrayIds(studentIdsInClass, student._id))
        .map(student => UserMapper.toUserProfileDTO(student));

      return {
        _id: doc._id,
        newId: doc.newId,
        name: doc.name,
        students: studentsClass,
        levelName: classType.subLevel.level.name,
        studentsNumbers: doc.students.length,
      };
    });

    const groupList: GetClassListResponse["groups"] = groups.map(doc => {
      const studentIdsInGroup = doc.students.slice(0, 4);

      const studentsGroup = students
        .filter(student => isIncludeArrayIds(studentIdsInGroup, student._id))
        .map(student => UserMapper.toUserProfileDTO(student));

      return {
        _id: doc._id,
        newId: doc.newId,
        name: doc.name,
        students: studentsGroup,
        levelName: doc.groupType.name,
        studentsNumbers: doc.students.length,
      };
    });

    return {
      classes: classList,
      groups: groupList,
    };
  }
}
