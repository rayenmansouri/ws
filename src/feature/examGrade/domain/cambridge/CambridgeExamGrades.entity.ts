import { InternalError } from "../../../../core/ApplicationErrors";
import { ID } from "../../../../types/BaseEntity";
import { CambridgeGrade } from "./CambridgeGrade.valueobject";

export class CambridgeExamGrades {
  examType: string;
  examTypeRank: number;
  coefficient: number;
  examGradeId: ID;
  studentGrades: { studentId: ID; grade: CambridgeGrade }[];

  constructor({
    examType,
    examTypeRank,
    coefficient,
    examGradeId,
    studentGrades,
  }: {
    examType: string;
    examTypeRank: number;
    coefficient: number;
    examGradeId: ID;
    studentGrades: { studentId: ID; grade: CambridgeGrade }[];
  }) {
    this.examType = examType;
    this.examTypeRank = examTypeRank;
    this.coefficient = coefficient;
    this.examGradeId = examGradeId;
    this.studentGrades = studentGrades;
  }

  findStudentGrade(studentId: ID): CambridgeGrade {
    const studentGrade = this.studentGrades.find(
      studentGrade => studentGrade.studentId === studentId,
    );

    if (!studentGrade) throw new InternalError("grade.notFound");

    return studentGrade.grade;
  }
}
