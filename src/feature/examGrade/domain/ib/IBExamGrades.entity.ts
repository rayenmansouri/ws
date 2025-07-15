import { InternalError } from "../../../../core/ApplicationErrors";
import { ID } from "../../../../types/BaseEntity";
import { IBGrade } from "./IBGrade.valueobject";

export class IBExamGrades {
  examType: string;
  examTypeRank: number;
  coefficient: number;
  examGradeId: ID;
  studentGrades: { studentId: ID; grade: IBGrade }[];

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
    studentGrades: { studentId: ID; grade: IBGrade }[];
  }) {
    this.examType = examType;
    this.examTypeRank = examTypeRank;
    this.coefficient = coefficient;
    this.examGradeId = examGradeId;
    this.studentGrades = studentGrades;
  }

  findStudentGrade(studentId: ID): IBGrade {
    const studentGrade = this.studentGrades.find(
      studentGrade => studentGrade.studentId === studentId,
    );

    if (!studentGrade) throw new InternalError("grade.notFound");

    return studentGrade.grade;
  }
}
