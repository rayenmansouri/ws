import { UserProfileDTO } from "./../../users/dtos/userProfile.dto";
import { UserMapper } from "./../../users/mappers/User.mapper";
import { Admin } from "./../../admins/domain/admin.entity";
import { Parent } from "./../../parents/domain/parent.entity";
import { TEndUserEnum } from "./../../../constants/globalEnums";
import { PickFromEnum } from "./../../../types/utils/enums.util";
import { ID } from "./../../../types/BaseEntity";
import { BadRequestError } from "./../../../core/ApplicationErrors";
import { StudentApplicationService } from "./../../students/application/Student.application.service";
import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { StudentRepo } from "../../students/domain/Student.repo";
import { StudentService } from "../../students/domain/Student.service";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { SubjectTypeRepo } from "../../subjectTypes/domains/SubjectType.repo";
import { SubSubjectTypesRepo } from "../../subSubjectTypes/repos/SubSubjectTypes.repo";
import { TeacherRepo } from "../../teachers/domain/Teacher.repo";

export type getTeacherOfStudentUseCaseRequestDto = {
  studentNewId: string;
  userType: PickFromEnum<TEndUserEnum, "admin" | "parent">;
  user: Parent | Admin;
};

@injectable()
export class GetTeacherOfStudentUseCase {
  constructor(
    @inject("StudentApplicationService") private studentAppService: StudentApplicationService,
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("SubjectTypeRepo") private subjectTypeRepo: SubjectTypeRepo,
    @inject("SubSubjectTypeRepo") private subSubjectTypeRepo: SubSubjectTypesRepo,
    @inject("TeacherRepo") private teacherRepo: TeacherRepo,
  ) {}

  async execute(
    dto: getTeacherOfStudentUseCaseRequestDto,
  ): Promise<{ topicName: string; teacher: UserProfileDTO }[]> {
    const student = await this.studentRepo.findOneByNewIdOrThrow(
      dto.studentNewId,
      "notFound.student",
    );

    if (dto.userType === "parent") {
      StudentService.ensureStudentIsAssignedToParent(student._id, dto.user as Parent);
    }

    const studentCurrentAcademicDetails = await this.studentAppService.getCurrentAcademicDetails(
      student,
    );

    if (!studentCurrentAcademicDetails.classId) throw new BadRequestError("student not enrolled");

    const classDoc = await this.classRepo.findOneByIdOrThrow(
      studentCurrentAcademicDetails.classId,
      "notFound.class",
    );

    const teachersSubjectIds = Object.values(classDoc.subjectTeacherMap);
    const teachersSubSubjectIds = Object.values(classDoc.subSubjectTeacherMap);

    const subjectTypeIds = Object.keys(classDoc.subjectTeacherMap) as ID[];
    const subSubjectTypeIds = Object.keys(classDoc.subSubjectTeacherMap) as ID[];

    const subjectTypesPromise = this.subjectTypeRepo.findManyByIdsOrThrow(
      subjectTypeIds,
      "notFound.subjectType",
    );

    const subSubjectTypesPromise = this.subSubjectTypeRepo.findManyByIdsOrThrow(
      subSubjectTypeIds,
      "notFound.subSubjectType",
    );

    const [subjectTypes, subSubjectTypes] = await Promise.all([
      subjectTypesPromise,
      subSubjectTypesPromise,
    ]);

    const topics = [...subjectTypes, ...subSubjectTypes];

    const teacherIds = Array.from(
      new Set([...teachersSubjectIds, ...teachersSubSubjectIds]),
    ).filter((id): id is ID => id !== null);

    const teachers = await this.teacherRepo.findUnArchivedTeacherByIds(teacherIds);
    const coveredTeacher: ID[] = [];

    const teachersWithTopic: {
      topicName: string;
      teacher: UserProfileDTO;
    }[] = [];

    for (const topic of topics) {
      const teacherId =
        classDoc.subjectTeacherMap?.[String(topic._id)] ||
        classDoc.subSubjectTeacherMap?.[String(topic._id)];

      const teacher = teachers.find(teacher => teacher._id === teacherId);

      if (!teacher) continue;

      if (!coveredTeacher.includes(teacher._id)) {
        coveredTeacher.push(teacher._id);
        teachersWithTopic.push({
          topicName: topic.name,
          teacher: UserMapper.toUserProfileDTO(teacher),
        });
      } else continue;
    }
    return teachersWithTopic;
  }
}
