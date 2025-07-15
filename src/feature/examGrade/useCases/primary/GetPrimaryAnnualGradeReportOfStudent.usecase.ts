import { injectable } from "inversify";
import { BadRequestError } from "../../../../core/ApplicationErrors";
import { inject } from "../../../../core/container/TypedContainer";
import { ClassRepo } from "../../../classes/domain/Class.repo";
import { School } from "../../../schools/domain/school.entity";
import { StudentRepo } from "../../../students/domain/Student.repo";
import { StudentProfileRepo } from "../../../students/domain/StudentProfile.repo";
import { PROMOTION_STATUS_ENUM } from "../../domain/tunisian/ExamGrade.entity";
import { PrimaryClassGradesRepo } from "../../domain/tunisian/primary/PrimaryClassGrades.repo";
import { PrimaryAnnualGradeReportDTO } from "../../dto/primary/PrimaryAnnualGradeReport.dto";

@injectable()
export class GetPrimaryAnnualGradeReportOfStudentUsecase {
  constructor(
    @inject("PrimaryClassGradesRepo") private primaryClassGradesRepo: PrimaryClassGradesRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("StudentProfileRepo") private studentProfileRepo: StudentProfileRepo,
    @inject("School") private school: School,
  ) {}

  async execute(classNewId: string, studentNewId: string): Promise<PrimaryAnnualGradeReportDTO> {
    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class", {
      populate: ["schoolYear"],
    });
    const student = await this.studentRepo.findOneByNewIdOrThrow(studentNewId, "notFound.student");
    const studentProfile = await this.studentProfileRepo.getStudentProfileOfSchoolYearOrThrow(
      student._id,
      classDoc.schoolYear._id,
    );

    if (!classDoc.students.includes(student._id)) throw new BadRequestError("invalid.class");

    const areAllTermsCompleted = classDoc.gradeReports.length === classDoc.schoolYear.terms.length;
    if (!areAllTermsCompleted) throw new BadRequestError("term.notCompleted");

    const termIds = classDoc.schoolYear.terms.map(term => term._id);
    const annualClassGrades = await this.primaryClassGradesRepo.loadAnnualClassGrades(
      classDoc._id,
      termIds,
    );

    const studentAnnualAverage = annualClassGrades.calculateStudentAnnualAverage(student._id);

    const promotionStatus = studentAnnualAverage.isPromoted()
      ? PROMOTION_STATUS_ENUM.PROMOTED
      : studentProfile.isExceptionallyPromoted
      ? PROMOTION_STATUS_ENUM.EXCEPTIONALLY_PROMOTED
      : PROMOTION_STATUS_ENUM.NOT_PROMOTED;

    const allStudentsAnnualAverage = classDoc.students
      .map(studentId => {
        const studentAnnualAverage = annualClassGrades.calculateStudentAnnualAverage(studentId);

        return studentAnnualAverage.mark;
      })
      .filter(mark => mark !== null);

    const teacherNames = annualClassGrades.termClassGrades[0]
      .getTeachers()
      .map(teacher => teacher.fullName);

    return {
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
    };
  }
}
