import { Diploma } from "../../diploma/diploma.entity";
import { ESTABLISHMENT_TITLE_ENUM, Level } from "../../levels/domains/level.entity";
import { School } from "../../schools/domain/school.entity";
import { Student } from "../../students/domain/student.entity";
import { Term } from "../../terms/domains/term.entity";
import { Grade } from "../domain/tunisian/Grade.valueobject";
import { PrimaryTermClassGrades } from "../domain/tunisian/primary/PrimaryTermClassGrades.entity";
import { PrimaryGradeReportDTO } from "../dto/primary/PrimaryGradeReport.dto";

export class PrimaryGradeReportMapper {
  static toDTO({
    student,
    classGrades,
    school,
    level,
    allDiplomas,
    term,
    studentAnnualAverage,
  }: {
    student: Student;
    classGrades: PrimaryTermClassGrades;
    school: School;
    level: Level;
    allDiplomas: Diploma[];
    term: Term;
    studentAnnualAverage: Grade | null;
  }): PrimaryGradeReportDTO {
    const fields: PrimaryGradeReportDTO["gradeReport"]["fields"] = [];
    for (const field of classGrades.fields) {
      const subjects: PrimaryGradeReportDTO["gradeReport"]["fields"][number]["subjects"] = [];

      for (const subject of field.subTopics) {
        if (subject.subTopics.length > 0) {
          const subSubjects: PrimaryGradeReportDTO["gradeReport"]["fields"][number]["subjects"][number]["subSubjects"] =
            [];

          for (const subSubject of subject.subTopics) {
            subSubjects.push({
              name: subSubject.name,
              studentGrade: subSubject.calculateStudentAverage(student._id).format(),
              highestGrade: subSubject.calculateHighestAverage().format(),
              lowestGrade: subSubject.calculateLowestAverage().format(),
            });
          }

          subjects.push({
            name: subject.name,
            studentGrade: null,
            highestGrade: null,
            lowestGrade: null,
            subSubjects,
          });
          continue;
        }

        subjects.push({
          name: subject.name,
          studentGrade: subject.calculateStudentAverage(student._id).format(),
          highestGrade: subject.calculateHighestAverage().format(),
          lowestGrade: subject.calculateLowestAverage().format(),
          subSubjects: [],
        });
      }

      fields.push({
        name: field.name,
        studentAverage: field.calculateStudentAverage(student._id).format(),
        teacherObservation: field.findStudentObservation(student._id),
        subjects,
      });
    }

    const studentTotalAverage = classGrades.calculateStudentAverage(student._id);
    const diploma = allDiplomas.find(
      diploma =>
        studentTotalAverage.mark !== null &&
        studentTotalAverage.mark >= diploma.minAverage &&
        studentTotalAverage.mark <= diploma.maxAverage,
    );

    return {
      examGradeSystem: level.examGradeSystem,
      templateName: classGrades.gradeReportTemplateName,
      student: {
        _id: student._id,
        newId: student.newId,
        uniqueId: student.uniqueId,
        fullName: student.fullName,
        className: classGrades.class.name,
      },
      school: {
        _id: school._id,
        name: school.name,
        address: school.address,
        email: school.email,
        phoneNumber: school.phoneNumber,
        establishmentTitle: level.establishmentTitle || ESTABLISHMENT_TITLE_ENUM.PRIVATE_PRIMARY,
        educationDepartment: school.educationDepartment,
        schoolYearName: level.currentSchoolYear.name,
        gradeReportTheme: school.gradeBookTheme,
        termName: term.name,
      },
      gradeReport: {
        totalStudentNumber: classGrades.studentIds.length,
        studentAverage: studentTotalAverage.format(),
        studentRank: classGrades.calculateStudentRank(student._id),
        lowestAverage: classGrades.calculateLowestAverage().format(),
        highestAverage: classGrades.calculateHighestAverage().format(),
        fields,
        studentDiploma: diploma ? diploma.name : null,
        studentAnnualAverage: studentAnnualAverage ? studentAnnualAverage.format() : null,
      },
    };
  }
}
