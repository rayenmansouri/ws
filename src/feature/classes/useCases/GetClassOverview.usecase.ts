import { Classroom } from "./../../classrooms/domains/classroom.entity";
import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ClassRepo } from "../domain/Class.repo";
import { ClassOverviewDTO } from "../dto/ClassOverview.dto";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { END_USER_ENUM } from "../../../constants/globalEnums";
import { ID } from "../../../types/BaseEntity";
import { LevelRepo } from "../../levels/repos/Level.repo";
import { ANNUAL_TERM_ID, Term } from "../../terms/domains/term.entity";
import { translate } from "../../../translation/helper/translate";
import { TLanguageEnum } from "../../../translation/constants";
import { GradeReportTemplateRepo } from "../../gradeReportTemplate/domain/GradeReportTemplate.repo";
import { GradeReportTemplateMapper } from "../../gradeReportTemplate/mappers/GradeReportTemplate.mapper";
import { ClassroomRepo } from "../../classrooms/domains/classroom.repo";
import { EntityMapper } from "../../entity/mapper/entity.mapper";

@injectable()
export class GetClassOverviewUseCase {
  constructor(
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("LevelRepo") private levelRepo: LevelRepo,
    @inject("GradeReportTemplateRepo") private gradeReportTemplateRepo: GradeReportTemplateRepo,
    @inject("ClassroomRepo") private readonly classroomRepo: ClassroomRepo,
  ) {}

  async execute({
    classNewId,
    userId,
    userType,
    language,
  }: {
    classNewId: string;
    userId: ID;
    userType: string;
    language: TLanguageEnum;
  }): Promise<ClassOverviewDTO> {
    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class", {
      populate: ["schoolYear", "classType", "classGroups"],
    });
    const levelDoc = await this.levelRepo.findOneByIdOrThrow(
      classDoc.schoolYear.level,
      "notFound.level",
    );

    const gradeReportTemplates = await this.gradeReportTemplateRepo.findTemplatesByClassType(
      classDoc.classType._id,
    );

    if (userType === END_USER_ENUM.TEACHER) {
      const teachersOfClass = [
        ...Object.values(classDoc.subjectTeacherMap),
        ...Object.values(classDoc.subSubjectTeacherMap),
      ];

      const isTeacherOfClass = teachersOfClass.includes(userId);
      if (!isTeacherOfClass) throw new BadRequestError("classRules.teacherIsNotInClass");
    }

    const areAllTermsCompleted = classDoc.gradeReports.length === classDoc.schoolYear.terms.length;
    const noTermCompleted = classDoc.gradeReports.length === 0;
    const firstTerm = classDoc.schoolYear.terms[0];
    const lastTerm = classDoc.schoolYear.terms[classDoc.schoolYear.terms.length - 1];

    let currentTerm: Term;
    if (areAllTermsCompleted) currentTerm = lastTerm;
    else if (noTermCompleted) currentTerm = firstTerm;
    else currentTerm = classDoc.schoolYear.terms[classDoc.gradeReports.length - 1];

    const preferredClassroom: Classroom | null = classDoc.preferredClassroom
      ? await this.classroomRepo.findOneById(classDoc.preferredClassroom)
      : null;
    const result: ClassOverviewDTO = {
      classGroups: classDoc.classGroups.map(EntityMapper.toEntityDto),
      classType: EntityMapper.toEntityDto(classDoc.classType),
      classId: classDoc._id,
      classNewId: classDoc.newId,
      className: classDoc.name,
      levelId: levelDoc._id,
      schoolYearId: classDoc.schoolYear._id,
      terms: classDoc.schoolYear.terms.map((term, index) => {
        const termGradeReport = classDoc.gradeReports.find(report => report.term === term._id);
        const isCompletedTerm = termGradeReport ? true : false;
        const isCurrentTerm = index === classDoc.gradeReports.length;
        const isPublished = termGradeReport ? termGradeReport.isPublished : false;

        return {
          newId: term.newId,
          _id: term._id,
          name: term.name,
          isLocked: !isCompletedTerm && !isCurrentTerm,
          isCompleted: isCompletedTerm,
          isPublished,
        };
      }),
      currentTermNewId: currentTerm.newId,
      examGradeSystem: levelDoc.examGradeSystem,
      gradeReportTemplates: gradeReportTemplates.map(template =>
        GradeReportTemplateMapper.toDTO(template),
      ),
      notAvailableTimes: classDoc.notAvailableTimes,
      maxContinuousHours: classDoc.maxContinuousHours,
      maxHoursPerDay: classDoc.maxHoursPerDay,
      maxGapsPerDay: classDoc.maxGapsPerDay,
      preferredClassroom: preferredClassroom
        ? {
            _id: preferredClassroom?._id,
            newId: preferredClassroom.newId,
            name: preferredClassroom.name,
          }
        : null,
    };

    if (userType === END_USER_ENUM.ADMIN)
      result.terms.push({
        _id: ANNUAL_TERM_ID as ID,
        newId: ANNUAL_TERM_ID,
        isCompleted: areAllTermsCompleted,
        isLocked: !areAllTermsCompleted,
        isPublished: areAllTermsCompleted,
        name: translate("term.annual", language) as string,
      });

    return result;
  }
}
