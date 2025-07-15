import { ID } from "../../../../../types/BaseEntity";
import { ITermClassGrades } from "../../TermClassGrades.interface";
import { Grade } from "../Grade.valueobject";
import { GradingEntity } from "../Grading.entity";

export class SecondaryTermClassGrades implements ITermClassGrades {
  class: {
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
  subjects: GradingEntity[];
  studentIds: ID[];
  groups: GradingEntity[];

  constructor({
    classDoc,
    term,
    subjects,
    studentIds,
    groups,
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
    subjects: GradingEntity[];
    studentIds: ID[];
    groups: GradingEntity[];
  }) {
    this.class = classDoc;
    this.term = term;
    this.subjects = subjects;
    this.studentIds = studentIds;
    this.groups = groups;
  }

  findGroupsOfStudent(studentId: ID): GradingEntity[] {
    return this.groups.filter(group => group.studentIds.includes(studentId));
  }

  calculateStudentAverage(studentId: ID): Grade {
    const averages: Grade[] = [];

    for (const subject of this.subjects) {
      const subjectAverage = subject.calculateStudentAverage(studentId);
      averages.push(subjectAverage);
    }

    const groups = this.findGroupsOfStudent(studentId);

    for (const group of groups) {
      const groupAverage = group.calculateStudentAverage(studentId);
      averages.push(groupAverage);
    }

    const totalAverage = Grade.calculateAverage(averages, this.term.coefficient);
    return totalAverage;
  }

  calculateStudentRank(studentId: ID): number | null {
    const studentAverages: { id: ID; grade: Grade }[] = [];

    for (const studentId of this.studentIds) {
      const studentAverage = this.calculateStudentAverage(studentId);
      studentAverages.push({ id: studentId, grade: studentAverage });
    }

    const rank = Grade.calculateRank(studentAverages, studentId);

    return rank;
  }

  calculateHighestAverage(): Grade {
    const studentAverages = this.studentIds
      .map(studentId => this.calculateStudentAverage(studentId))
      .sort((a, b) => (b.mark ?? 0) - (a.mark ?? 0));

    return studentAverages[0];
  }

  calculateLowestAverage(): Grade {
    const studentAverages = this.studentIds
      .map(studentId => this.calculateStudentAverage(studentId))
      .sort((a, b) => (a.mark ?? 0) - (b.mark ?? 0));

    return studentAverages[0];
  }

  calculateAvgRateAbove10(): string {
    if (this.studentIds.length === 0) return "0.00";

    const studentAveragesAbove10 = this.studentIds
      .map(studentId => this.calculateStudentAverage(studentId))
      .filter(average => average.mark !== null && average.mark > 10);

    const totalStudent = this.studentIds.length;
    const totalStudentAbove10 = studentAveragesAbove10.length;

    return ((totalStudentAbove10 / totalStudent) * 100).toFixed(2);
  }

  getDegreesCoverage(): number {
    const subjectsCoverage = this.subjects.map(subject => subject.getDegreesCoverage());
    return Math.min(...subjectsCoverage);
  }

  getTotalAverage(): Grade {
    const studentAverages = this.studentIds.map(studentId =>
      this.calculateStudentAverage(studentId),
    );
    return Grade.calculateAverage(studentAverages);
  }
}
