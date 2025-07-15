import { Diploma } from "../../diploma/diploma.entity";
import { Level } from "../../levels/domains/level.entity";
import { School } from "../../schools/domain/school.entity";
import { Student } from "../../students/domain/student.entity";
import { Term } from "../../terms/domains/term.entity";
import { CambridgeTermClassGrades } from "../domain/cambridge/CambridgeTermClassGrades.entity";
import { CambridgeGrade } from "../domain/cambridge/CambridgeGrade.valueobject";
import { CambridgeGradeReportDTO } from "../dto/cambridge/CambridgeGradeReport.dto";

export class CambridgeGradeReportMapper {
  static toDTO({
    student,
    classGrades,
    school,
    level,
    allDiplomas,
    currentTerm,
  }: {
    student: Student;
    classGrades: CambridgeTermClassGrades;
    school: School;
    level: Level;
    allDiplomas: Diploma[];
    currentTerm: Term;
  }): CambridgeGradeReportDTO {
    const examTypes: { name: string; rank: number }[] = [];

    const subjects: CambridgeGradeReportDTO["gradeReport"]["subjects"] = [];
    for (const subject of classGrades.subjects) {
      subjects.push({
        name: subject.name,
        grades: subject.examGrades.reduce((acc, examGrade) => {
          if (!examTypes.find(examType => examType.name === examGrade.examType)) {
            examTypes.push({
              name: examGrade.examType,
              rank: examGrade.examTypeRank,
            });
          }

          acc[examGrade.examType] = examGrade.findStudentGrade(student._id).format();
          return acc;
        }, {} as Record<string, string | null>),
        studentAverage: subject.calculateStudentAverage(student._id).format(),
        studentLetterGrade: subject.calculateStudentAverage(student._id).getLetterGrade(),
        studentAverageEquivalence: subject.calculateStudentAverage(student._id).getEquivalence(),
        studentRank: subject.calculateStudentRank(student._id),
        teacherName: subject.teacher?.fullName ?? null,
        teacherObservation: subject.findStudentObservation(student._id),
      });
    }

    for (const group of classGrades.findGroupsOfStudent(student._id)) {
      subjects.push({
        name: group.name,
        studentAverage: group.calculateStudentAverage(student._id).format(),
        studentAverageEquivalence: group.calculateStudentAverage(student._id).getEquivalence(),
        studentLetterGrade: group.calculateStudentAverage(student._id).getLetterGrade(),
        studentRank: group.calculateStudentRank(student._id),
        teacherName: group.teacher?.fullName ?? null,
        teacherObservation: group.findStudentObservation(student._id),
        grades: group.examGrades.reduce((acc, examGrade) => {
          if (!examTypes.find(examType => examType.name === examGrade.examType)) {
            examTypes.push({
              name: examGrade.examType,
              rank: examGrade.examTypeRank,
            });
          }

          acc[examGrade.examType] = examGrade.findStudentGrade(student._id).format();
          return acc;
        }, {} as Record<string, string | null>),
      });
    }

    const examNames = examTypes.sort((a, b) => a.rank - b.rank).map(exam => exam.name);

    const studentTotalAverage = classGrades.calculateStudentAverage(student._id);
    const diploma = allDiplomas.find(
      diploma =>
        studentTotalAverage.mark !== null &&
        diploma.minAverage <= studentTotalAverage.mark &&
        diploma.maxAverage >= studentTotalAverage.mark,
    );

    return {
      examGradeSystem: level.examGradeSystem,
      letterGradeIntervals: Object.entries(CambridgeGrade.letterGradeRanges).map(
        ([letter, { min, max }]) => ({
          letter,
          interval: `${min}-${max}`,
        }),
      ),
      student: {
        _id: student._id,
        newId: student.newId,
        fullName: student.fullName,
        className: classGrades.class.name,
        birthDate: student.birthDate,
      },
      school: {
        _id: school._id,
        name: school.name,
        address: school.address,
        email: school.email,
        phoneNumber: school.phoneNumber,
        educationDepartment: school.educationDepartment,
        schoolYearName: level.currentSchoolYear.name,
        currentTermName: currentTerm.name,
      },
      examNames,
      gradeReport: {
        studentAverage: studentTotalAverage.format(),
        studentAverageEquivalence: studentTotalAverage.getEquivalence(),
        studentLetterGrade: studentTotalAverage.getLetterGrade(),
        studentRank: classGrades.calculateStudentRank(student._id),
        subjects,
        studentDiploma: diploma ? diploma.name : null,
      },
    };
  }
}
