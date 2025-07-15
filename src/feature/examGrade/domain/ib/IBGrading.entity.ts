import { ID } from "../../../../types/BaseEntity";
import { UserProfileDTO } from "../../../users/dtos/userProfile.dto";
import { IBExamGrades } from "./IBExamGrades.entity";
import { IBSubjectAverage } from "./IBSubjectAverage.valueobject";

export class IBGradingEntity {
  name: string;
  newId: string;
  coefficient: number;
  examGrades: IBExamGrades[];
  studentIds: ID[];
  teacher: UserProfileDTO | null;
  teacherObservations: {
    studentId: ID;
    observation: string | null;
  }[];
  teacherInvestments: {
    studentId: ID;
    investment: string | null;
  }[];
  gradeBookObservationId: ID;

  constructor({
    name,
    newId,
    coefficient,
    examGrades,
    studentIds,
    teacher,
    teacherObservations,
    teacherInvestments,
    gradeBookObservationId,
  }: {
    name: string;
    newId: string;
    coefficient: number;
    examGrades: IBExamGrades[];
    studentIds: ID[];
    teacher: UserProfileDTO | null;
    teacherObservations: {
      studentId: ID;
      observation: string | null;
    }[];
    teacherInvestments: {
      studentId: ID;
      investment: string | null;
    }[];
    gradeBookObservationId: ID;
  }) {
    this.name = name;
    this.newId = newId;
    this.coefficient = coefficient;
    this.examGrades = examGrades;
    this.studentIds = studentIds;
    this.teacher = teacher;
    this.teacherObservations = teacherObservations;
    this.teacherInvestments = teacherInvestments;
    this.gradeBookObservationId = gradeBookObservationId;
  }

  calculateStudentAverage(studentId: ID): IBSubjectAverage {
    const studentGrades = this.examGrades.map(examGrade => examGrade.findStudentGrade(studentId));

    const studentAverage = IBSubjectAverage.create(studentGrades);

    return studentAverage;
  }

  findStudentObservation(studentId: ID): string | null {
    const observation = this.teacherObservations.find(
      observation => observation.studentId === studentId,
    )?.observation;

    if (observation === undefined) throw new Error("global.internalError");

    return observation;
  }

  findStudentInvestment(studentId: ID): string | null {
    const investment = this.teacherInvestments.find(
      observation => observation.studentId === studentId,
    )?.investment;

    return investment ?? null;
  }

  getDegreesCoverage(): number {
    let studentsWithAllGrades = 0;

    for (const studentId of this.studentIds) {
      const hasAllGrades = this.examGrades.every(examGrade => {
        const studentGrade = examGrade.findStudentGrade(studentId);

        return studentGrade.mark !== null || studentGrade.isDispensed;
      });

      if (hasAllGrades) studentsWithAllGrades++;
    }

    return studentsWithAllGrades;
  }

  calculateHighestAverage(): string | null {
    const averages = this.studentIds
      .map(studentId => this.calculateStudentAverage(studentId).mark)
      .filter(value => value !== null);

    const sortedAverages = averages.sort((a, b) => b - a);

    return sortedAverages[0] ? sortedAverages[0].toString() : null;
  }

  calculateLowestAverage(): string | null {
    const averages = this.studentIds
      .map(studentId => this.calculateStudentAverage(studentId).mark)
      .filter(value => value !== null);

    const sortedAverages = averages.sort((a, b) => a - b);

    return sortedAverages[0] ? sortedAverages[0].toString() : null;
  }
}
