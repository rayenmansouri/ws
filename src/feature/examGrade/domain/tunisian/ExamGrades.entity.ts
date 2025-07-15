import { InternalError } from "../../../../core/ApplicationErrors";
import { ID } from "../../../../types/BaseEntity";
import { Grade } from "./Grade.valueobject";

export class ExamGrades {
  examGradeId: ID;
  examType: string;
  examTypeRank: number;
  coefficient: number;
  studentGrades: { studentId: ID; grade: Grade }[];

  constructor({
    examType,
    examTypeRank,
    studentGrades,
    examGradeId,
    coefficient,
  }: {
    examType: string;
    examTypeRank: number;
    studentGrades: { studentId: ID; grade: Grade }[];
    examGradeId: ID;
    coefficient: number;
  }) {
    this.examType = examType;
    this.examTypeRank = examTypeRank;
    this.studentGrades = studentGrades;
    this.examGradeId = examGradeId;
    this.coefficient = coefficient;
  }

  findStudentGrade(studentId: ID): Grade {
    const studentGrade = this.studentGrades.find(
      studentGrade => studentGrade.studentId === studentId,
    );

    if (!studentGrade) throw new InternalError("grade.notFound");

    return studentGrade.grade;
  }
}
