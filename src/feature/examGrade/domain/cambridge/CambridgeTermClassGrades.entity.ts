import { ID } from "../../../../types/BaseEntity";
import { ITermClassGrades } from "../TermClassGrades.interface";
import { CambridgeGrade } from "./CambridgeGrade.valueobject";
import { CambridgeGradingEntity } from "./CambridgeGrading.entity";

export class CambridgeTermClassGrades implements ITermClassGrades {
  class: { _id: ID; newId: string; name: string };
  term: { _id: ID; newId: string; name: string; coefficient: number };
  subjects: CambridgeGradingEntity[];
  studentIds: ID[];
  groups: CambridgeGradingEntity[];
  adminObservations: {
    studentId: ID;
    observation: string | null;
  }[];

  constructor({
    classDoc,
    term,
    subjects,
    studentIds,
    groups,
    adminObservations,
  }: {
    classDoc: {
      _id: ID;
      newId: string;
      name: string;
    };
    term: {
      _id: ID;
      newId: string;
      name: string;
      coefficient: number;
    };
    subjects: CambridgeGradingEntity[];
    studentIds: ID[];
    groups: CambridgeGradingEntity[];
    adminObservations: {
      studentId: ID;
      observation: string | null;
    }[];
  }) {
    this.class = classDoc;
    this.term = term;
    this.subjects = subjects;
    this.studentIds = studentIds;
    this.groups = groups;
    this.adminObservations = adminObservations;
  }

  findGroupsOfStudent(studentId: ID): CambridgeGradingEntity[] {
    return this.groups.filter(group => group.studentIds.includes(studentId));
  }

  calculateStudentAverage(studentId: ID): CambridgeGrade {
    const averages: CambridgeGrade[] = [];

    for (const subject of this.subjects) {
      const subjectAverage = subject.calculateStudentAverage(studentId);
      averages.push(subjectAverage);
    }

    const groups = this.findGroupsOfStudent(studentId);

    for (const group of groups) {
      const groupAverage = group.calculateStudentAverage(studentId);
      averages.push(groupAverage);
    }

    const totalAverage = CambridgeGrade.calculateAverage(averages, this.term.coefficient);
    return totalAverage;
  }

  calculateStudentRank(studentId: ID): number | null {
    const studentAverages: { id: ID; grade: CambridgeGrade }[] = [];

    for (const studentId of this.studentIds) {
      const studentAverage = this.calculateStudentAverage(studentId);
      studentAverages.push({ id: studentId, grade: studentAverage });
    }

    const rank = CambridgeGrade.calculateRank(studentAverages, studentId);

    return rank;
  }

  findStudentObservation(studentId: ID): string | null {
    return (
      this.adminObservations.find(observation => observation.studentId === studentId)
        ?.observation || null
    );
  }

  getDegreesCoverage(): number {
    const subjectsCoverage = this.subjects.map(subject => subject.getDegreesCoverage());
    return Math.min(...subjectsCoverage);
  }

  getTotalAverage(): CambridgeGrade {
    const studentAverages = this.studentIds.map(studentId =>
      this.calculateStudentAverage(studentId),
    );
    return CambridgeGrade.calculateAverage(studentAverages);
  }
}
