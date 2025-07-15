import { ID } from "../../../../types/BaseEntity";
import { UserProfileDTO } from "../../../users/dtos/userProfile.dto";
import { CambridgeExamGrades } from "./CambridgeExamGrades.entity";
import { CambridgeGrade } from "./CambridgeGrade.valueobject";

export class CambridgeGradingEntity {
  name: string;
  newId: string;
  coefficient: number;
  examGrades: CambridgeExamGrades[];
  studentIds: ID[];
  teacher: UserProfileDTO | null;
  teacherObservations: {
    studentId: ID;
    observation: string | null;
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
    gradeBookObservationId,
  }: {
    name: string;
    newId: string;
    coefficient: number;
    examGrades: CambridgeExamGrades[];
    studentIds: ID[];
    teacher: UserProfileDTO | null;
    teacherObservations: {
      studentId: ID;
      observation: string | null;
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
    this.gradeBookObservationId = gradeBookObservationId;
  }

  calculateStudentAverage(studentId: ID): CambridgeGrade {
    const studentGrades = this.examGrades.map(examGrade => examGrade.findStudentGrade(studentId));

    const studentAverage = CambridgeGrade.calculateAverage(studentGrades, this.coefficient);

    return studentAverage;
  }

  calculateStudentRank(studentId: ID): number | null {
    const studentAverages: {
      id: ID;
      grade: CambridgeGrade;
    }[] = [];

    for (const id of this.studentIds) {
      const studentAverage = this.calculateStudentAverage(id);

      studentAverages.push({ id, grade: studentAverage });
    }

    const rank = CambridgeGrade.calculateRank(studentAverages, studentId);

    return rank;
  }

  findStudentObservation(studentId: ID): string | null {
    const observation = this.teacherObservations.find(
      observation => observation.studentId === studentId,
    )?.observation;

    if (observation === undefined) throw new Error("global.internalError");

    return observation;
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

  calculateHighestAverage(): CambridgeGrade {
    const averages = this.studentIds
      .map(studentId => this.calculateStudentAverage(studentId).mark)
      .filter(value => value !== null);

    const sortedAverages = averages.sort((a, b) => b - a);

    return CambridgeGrade.create(this.coefficient, sortedAverages[0] ?? null);
  }

  calculateLowestAverage(): CambridgeGrade {
    const averages = this.studentIds
      .map(studentId => this.calculateStudentAverage(studentId).mark)
      .filter(value => value !== null);

    const sortedAverages = averages.sort((a, b) => a - b);

    return CambridgeGrade.create(this.coefficient, sortedAverages[0] ?? null);
  }
}
