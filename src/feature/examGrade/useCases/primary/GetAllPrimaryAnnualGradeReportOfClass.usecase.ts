import { injectable } from "inversify";
import { BadRequestError } from "../../../../core/ApplicationErrors";
import { inject } from "../../../../core/container/TypedContainer";
import { ClassRepo } from "../../../classes/domain/Class.repo";
import { School } from "../../../schools/domain/school.entity";
import { StudentProfileRepo } from "../../../students/domain/StudentProfile.repo";
import { PROMOTION_STATUS_ENUM } from "../../domain/tunisian/ExamGrade.entity";
import { PrimaryClassGradesRepo } from "../../domain/tunisian/primary/PrimaryClassGrades.repo";
import { PrimaryAnnualGradeReportDTO } from "../../dto/primary/PrimaryAnnualGradeReport.dto";

@injectable()
export class GetAllPrimaryAnnualGradeReportOfClassUsecase {
  constructor(
    @inject("PrimaryClassGradesRepo") private primaryClassGradesRepo: PrimaryClassGradesRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("StudentProfileRepo") private studentProfileRepo: StudentProfileRepo,
    @inject("School") private school: School,
  ) {}

  async execute(classNewId: string): Promise<PrimaryAnnualGradeReportDTO[]> {
    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class", {
      populate: ["schoolYear", "students"],
    });
    const studentIds = classDoc.students.map(student => student._id);
    const allStudentProfiles = await this.studentProfileRepo.getManyStudentProfilesOfSchoolYear(
      studentIds,
      classDoc.schoolYear._id,
    );

    const areAllTermsCompleted = classDoc.gradeReports.length === classDoc.schoolYear.terms.length;
    if (!areAllTermsCompleted) throw new BadRequestError("term.notCompleted");

    const termIds = classDoc.schoolYear.terms.map(term => term._id);
    const annualClassGrades = await this.primaryClassGradesRepo.loadAnnualClassGrades(
      classDoc._id,
      termIds,
    );

    const allStudentsAnnualAverage = classDoc.students
      .map(student => {
        const studentAnnualAverage = annualClassGrades.calculateStudentAnnualAverage(student._id);

        return studentAnnualAverage.mark;
      })
      .filter(mark => mark !== null);

    const teacherNames = annualClassGrades.termClassGrades[0]
      .getTeachers()
      .map(teacher => teacher.fullName);

    const result: PrimaryAnnualGradeReportDTO[] = [];
    for (const student of classDoc.students) {
      const studentAnnualAverage = annualClassGrades.calculateStudentAnnualAverage(student._id);

      const studentProfile = allStudentProfiles.find(
        studentProfile => studentProfile.student === student._id,
      )!;

      const promotionStatus = studentAnnualAverage.isPromoted()
        ? PROMOTION_STATUS_ENUM.PROMOTED
        : studentProfile?.isExceptionallyPromoted
        ? PROMOTION_STATUS_ENUM.EXCEPTIONALLY_PROMOTED
        : PROMOTION_STATUS_ENUM.NOT_PROMOTED;

      result.push({
        information: {
          schoolId: this.school._id,
          schoolName: this.school.name,
          schoolYearName: classDoc.schoolYear.name,
          educationDepartment: this.school.educationDepartment,
          address: this.school.address,
          phoneNumber: this.school.phoneNumber,
          email: this.school.email,
          className: classDoc.name,
          numberOfStudents: classDoc.students.length,
          directorName: this.school.directorName,
        },
        student: {
          name: student.fullName,
          uniqueId: student.uniqueId,
          termNames: classDoc.schoolYear.terms.map(term => term.name),
          termAverages: annualClassGrades.termClassGrades.reduce((acc, termClassGrades) => {
            acc[termClassGrades.term.name] = termClassGrades
              .calculateStudentAverage(student._id)
              .format();
            return acc;
          }, {} as Record<string, string | null>),
          annualAverage: studentAnnualAverage.format(),
          promotionStatus,
          highestAnnualAverage: Math.max(...allStudentsAnnualAverage).toString(),
          lowestAnnualAverage: Math.min(...allStudentsAnnualAverage).toString(),
        },
        teacherNames,
        gradeReportTheme: this.school.gradeBookTheme,
      });
    }

    return result;
  }
}
