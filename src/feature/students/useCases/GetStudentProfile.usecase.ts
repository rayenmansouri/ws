import { SchoolYearMapper } from "./../../schoolYears/mappers/schoolYear.mapper";
import { ID } from "./../../../types/BaseEntity";
import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { EntityMapper } from "../../entity/mapper/entity.mapper";
import { GradeReportTemplateRepo } from "../../gradeReportTemplate/domain/GradeReportTemplate.repo";
import { GradeReportTemplateMapper } from "../../gradeReportTemplate/mappers/GradeReportTemplate.mapper";
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
    @inject("GradeReportTemplateRepo") private gradeReportTemplateRepo: GradeReportTemplateRepo,
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

    const gradeReportTemplates = classDoc
      ? await this.gradeReportTemplateRepo.findTemplatesByClassType(classDoc._id)
      : [];

    let currentTermNewId: string | null = null;
    if (classDoc) {
      const numberOfCompletedTerms = classDoc.gradeReports.length;
      const numberOfTerms = level.currentSchoolYear.terms.length;
      const currentTerm =
        numberOfCompletedTerms === numberOfTerms
          ? level.currentSchoolYear.terms[numberOfTerms - 1]
          : numberOfCompletedTerms === 0
          ? level.currentSchoolYear.terms[0]
          : level.currentSchoolYear.terms[numberOfCompletedTerms - 1];

      currentTermNewId = currentTerm.newId;
    }

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
      terms: classDoc
        ? level.currentSchoolYear.terms.map((term, index) => {
            const isCompletedTerm = classDoc.gradeReports.some(
              report => report.term.toString() === term._id.toString(),
            );
            const isCurrentTerm = index === classDoc.gradeReports.length;

            return {
              newId: term.newId,
              _id: String(term._id),
              name: term.name,
              isLocked: !isCompletedTerm && !isCurrentTerm,
            };
          })
        : [],
      currentTermNewId,
      examGradeSystem: level.examGradeSystem,
      groups: groups.map(group => ({
        ...EntityMapper.toEntityDto(group),
        groupTypeName: group.groupType.name,
      })),
      gradeReportTemplates: gradeReportTemplates.map(template =>
        GradeReportTemplateMapper.toDTO(template),
      ),
      schoolYears: schoolYears.map(schoolYear => SchoolYearMapper.toSchoolYearDto(schoolYear)),
      selectedSchoolYear: SchoolYearMapper.toSchoolYearDto(schoolYear),
    };
  }
}
