import { ID } from "../../../types/BaseEntity";
import { Level } from "../../levels/domains/level.entity";
import { School } from "../../schools/domain/school.entity";
import { Signature } from "../../signatures/domain/signature.entity";
import { Student } from "../../students/domain/student.entity";
import { Term } from "../../terms/domains/term.entity";
import { IBClassAverage } from "../domain/ib/IBClassAverage.valueobject";
import { IBTermClassGrades } from "../domain/ib/IBTermClassGrades.entity";
import { IBGradeReportDTO } from "../dto/ib/IBGradeReport.dto";

export class IBGradeReportMapper {
  static toDTO({
    student,
    classGrades,
    school,
    level,
    currentTerm,
    termClassGrades,
    annualAverage,
    attendanceStats,
    signature,
    classTypeId,
  }: {
    student: Student;
    classGrades: IBTermClassGrades;
    school: School;
    level: Level;
    currentTerm: Term;
    termClassGrades: IBTermClassGrades[];
    annualAverage: IBClassAverage | null;
    attendanceStats: { absent: number; late: number; expelled: number };
    signature: Signature | null;
    classTypeId: ID;
  }): IBGradeReportDTO {
    const examTypes: { name: string; rank: number }[] = [];

    const subjects: IBGradeReportDTO["gradeReport"]["subjects"] = [];
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
        teacherName: subject.teacher?.fullName ?? null,
        teacherObservation: subject.findStudentObservation(student._id),
        investment: subject.findStudentInvestment(student._id),
      });
    }

    for (const group of classGrades.findGroupsOfStudent(student._id)) {
      subjects.push({
        name: group.name,
        studentAverage: group.calculateStudentAverage(student._id).format(),
        teacherName: group.teacher?.fullName ?? null,
        teacherObservation: group.findStudentObservation(student._id),
        investment: group.findStudentInvestment(student._id),
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

    const termNames = termClassGrades.map(term => term.term.name);

    const termAverages = termClassGrades.reduce((acc, term) => {
      acc[term.term.name] = term.calculateStudentAverage(student._id).format();
      return acc;
    }, {} as Record<string, string | null>);

    return {
      examGradeSystem: level.examGradeSystem,
      student: {
        _id: student._id,
        newId: student.newId,
        fullName: student.fullName,
        className: classGrades.class.name,
        classTypeId,
      },
      school: {
        _id: school._id,
        directorName: signature ? signature.personName : school.directorName,
        schoolYearName: level.currentSchoolYear.name,
        currentTermName: currentTerm.name,
      },
      examNames,
      gradeReport: {
        studentAverage: studentTotalAverage.format(),
        subjects,
        adminObservation: classGrades.findStudentObservation(student._id),
      },
      termNames,
      termAverages,
      annualAverage: annualAverage ? annualAverage.format() : null,
      attendanceStats,
    };
  }
}
