import { School } from "../../schools/domain/school.entity";
import { SchoolYear } from "../../schoolYears/domain/schoolYear.entity";
import { Student } from "../../students/domain/student.entity";
import { CambridgeAnnualClassGrades } from "../domain/cambridge/CambridgeAnnualClassGrades.entity";
import { CambridgeGrade } from "../domain/cambridge/CambridgeGrade.valueobject";
import { CambridgeAnnualGradeReportDTO } from "../dto/cambridge/CambridgeAnnualGradeReport.dto";

export class CambridgeAnnualGradeReportMapper {
  static toDTO({
    annualGrades,
    student,
    school,
    schoolYear,
  }: {
    student: Student;
    annualGrades: CambridgeAnnualClassGrades;
    school: School;
    schoolYear: SchoolYear;
  }): CambridgeAnnualGradeReportDTO {
    const subjectGrades: {
      name: string;
      termGrades: Record<string, CambridgeGrade>;
      annualGrade: CambridgeGrade | null;
    }[] = [];

    for (const termClassGrades of annualGrades.termClassGrades) {
      for (const subject of termClassGrades.subjects) {
        let subjectGrade = subjectGrades.find(subjectGrade => subjectGrade.name === subject.name);
        if (!subjectGrade) {
          subjectGrade = {
            name: subject.name,
            termGrades: {},
            annualGrade: null,
          };
          subjectGrades.push(subjectGrade);
        }

        subjectGrade.termGrades[termClassGrades.term.name] = subject.calculateStudentAverage(
          student._id,
        );
      }

      for (const group of termClassGrades.groups) {
        let groupGrade = subjectGrades.find(groupGrade => groupGrade.name === group.name);
        if (!groupGrade) {
          groupGrade = {
            name: group.name,
            termGrades: {},
            annualGrade: null,
          };
          subjectGrades.push(groupGrade);
        }

        groupGrade.termGrades[termClassGrades.term.name] = group.calculateStudentAverage(
          student._id,
        );
      }
    }

    for (const subjectGrade of subjectGrades) {
      const termGrades = Object.values(subjectGrade.termGrades);
      const annualGrade = CambridgeGrade.calculateAverage(termGrades);
      subjectGrade.annualGrade = annualGrade;
    }

    return {
      student: {
        _id: student._id,
        newId: student.newId,
        fullName: student.fullName,
        birthDate: student.birthDate,
        className: annualGrades.class.name,
      },
      school: {
        _id: school._id,
        name: school.name,
        address: school.address,
        email: school.email,
        phoneNumber: school.phoneNumber,
        schoolYearName: schoolYear.name,
      },
      termNames: schoolYear.terms.map(term => term.name),
      subjectGrades: subjectGrades.map(subjectGrades => ({
        name: subjectGrades.name,
        termGrades: Object.fromEntries(
          Object.entries(subjectGrades.termGrades).map(([termName, grade]) => [
            termName,
            grade.format(),
          ]),
        ),
        annualGrade: subjectGrades.annualGrade?.format() ?? null,
        annualGradeLetter: subjectGrades.annualGrade?.getLetterGrade() ?? null,
      })),
      adminObservation:
        annualGrades.termClassGrades.at(-1)?.findStudentObservation(student._id) ?? null,
    };
  }
}
