import { SchoolYearMapper } from "./../../schoolYears/mappers/schoolYear.mapper";
import { ID } from "./../../../types/BaseEntity";
import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { EntityMapper } from "../../entity/mapper/entity.mapper";
import { GroupRepo } from "../../groupManagement/repos/Group.repo";
import { UserMapper } from "../../users/mappers/User.mapper";
import { StudentApplicationService } from "../application/Student.application.service";
import { StudentRepo } from "../domain/Student.repo";
import { StudentProfileDTO } from "../dtos/StudentProfile.dto";
import { SchoolYearRepo } from "../../schoolYears/domain/SchoolYear.repo";
import { StudentProfileRepo } from "../domain/StudentProfile.repo";

export type getStudentProfileRequestDto = {
  studentNewId: string;
  schoolYearId?: ID;
};

@injectable()
export class GetStudentProfileUseCase {
  constructor(
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("StudentApplicationService")
    private studentApplicationService: StudentApplicationService,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("GroupRepo") private groupRepo: GroupRepo,
    @inject("SchoolYearRepo") private readonly schoolYearRepo: SchoolYearRepo,
    @inject("StudentProfileRepo") private studentProfileRepo: StudentProfileRepo,
  ) {}

  async execute(dto: getStudentProfileRequestDto): Promise<StudentProfileDTO> {
    const student = await this.studentRepo.findOneByNewIdOrThrow(
      dto.studentNewId,
      "notFound.student",
      {
        populate: ["parents", "classType", "level"],
      },
    );
    const schoolYearId: ID = dto.schoolYearId ?? student.level.currentSchoolYear._id;

    const schoolYear = await this.schoolYearRepo.findOneByIdOrThrow(
      schoolYearId,
      "notFound.schoolYear",
      {
        populate: ["level"],
      },
    );

    const { classId, level, groupIds } =
      await this.studentApplicationService.getAcademicDetailsOfSchoolYear(
        student._id,
        schoolYear._id,
      );

    const classDoc = classId
      ? await this.classRepo.findOneByIdOrThrow(classId, "notFound.class")
      : null;

    const groups = await this.groupRepo.findManyByIdsOrThrow(groupIds, "notFound.group");
    const studentProfiles = await this.studentProfileRepo.getAllStudentProfileOfStudent(
      student._id,
    );
    const schoolYearsIds: ID[] = studentProfiles.map(studentProfile => studentProfile.schoolYear);

    const schoolYears = await this.schoolYearRepo.findManyByIdsOrThrow(
      schoolYearsIds,
      "notFound.schoolYear",
      {
        populate: ["level"],
      },
    );

    return {
      _id: student._id.toString(),
      newId: student.newId,
      uniqueId: student.uniqueId,
      firstName: student.firstName,
      lastName: student.lastName,
      fullName: student.fullName,
      email: student.email,
      phoneNumber: student.phoneNumber,
      avatar: student.avatar.link,
      gender: student.gender,
      birthDate: student.birthDate,
      address1: student.address1,
      address2: student.address2,
      parents: student.parents.map(parent => UserMapper.toUserProfileDTO(parent)),
      classType: EntityMapper.toEntityDto(student.classType),
      level: EntityMapper.toEntityDto(level),
      isEnrolled: !!classId,
      class: classDoc ? EntityMapper.toEntityDto(classDoc) : null,
      groups: groups.map(group => ({
        ...EntityMapper.toEntityDto(group),
        groupTypeName: group.groupType.name,
      })),
      schoolYears: schoolYears.map(schoolYear => SchoolYearMapper.toSchoolYearDto(schoolYear)),
      selectedSchoolYear: SchoolYearMapper.toSchoolYearDto(schoolYear),
    };
  }
}
