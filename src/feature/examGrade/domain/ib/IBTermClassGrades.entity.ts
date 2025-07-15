import { ID } from "../../../../types/BaseEntity";
import { ITermClassGrades } from "../TermClassGrades.interface";
import { IBClassAverage } from "./IBClassAverage.valueobject";
import { IBGradingEntity } from "./IBGrading.entity";
import { IBSubjectAverage } from "./IBSubjectAverage.valueobject";

export class IBTermClassGrades implements ITermClassGrades {
  class: { _id: ID; newId: string; name: string };
  term: { _id: ID; newId: string; name: string; coefficient: number };
  subjects: IBGradingEntity[];
  studentIds: ID[];
  groups: IBGradingEntity[];
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
    subjects: IBGradingEntity[];
    studentIds: ID[];
    groups: IBGradingEntity[];
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

  findGroupsOfStudent(studentId: ID): IBGradingEntity[] {
    return this.groups.filter(group => group.studentIds.includes(studentId));
  }

  calculateStudentAverage(studentId: ID): IBClassAverage {
    const averages: IBSubjectAverage[] = [];

    for (const subject of this.subjects) {
      const subjectAverage = subject.calculateStudentAverage(studentId);
      averages.push(subjectAverage);
    }

    const groups = this.findGroupsOfStudent(studentId);

    for (const group of groups) {
      const groupAverage = group.calculateStudentAverage(studentId);
      averages.push(groupAverage);
    }

    const studentAverage = IBClassAverage.createFromSubjectAverages(averages);

    return studentAverage;
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
}
