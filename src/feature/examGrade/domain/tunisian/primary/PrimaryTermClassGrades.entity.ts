import { ID } from "../../../../../types/BaseEntity";
import { UserProfileDTO } from "../../../../users/dtos/userProfile.dto";
import { ITermClassGrades } from "../../TermClassGrades.interface";
import { Grade } from "../Grade.valueobject";
import { GradingEntity } from "../Grading.entity";

export class PrimaryTermClassGrades implements ITermClassGrades {
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
  gradeReportTemplateName: string | null;
  fields: GradingEntity[];
  studentIds: ID[];

  constructor({
    classDoc,
    term,
    fields,
    studentIds,
    gradeReportTemplateName,
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
    fields: GradingEntity[];
    studentIds: ID[];
    gradeReportTemplateName: string | null;
  }) {
    this.class = classDoc;
    this.term = term;
    this.fields = fields;
    this.studentIds = studentIds;
    this.gradeReportTemplateName = gradeReportTemplateName;
  }

  calculateStudentAverage(studentId: ID): Grade {
    const fieldAverage = this.fields.map(field => field.calculateStudentAverage(studentId));

    return Grade.calculateAverage(fieldAverage, this.term.coefficient);
  }

  calculateStudentRank(studentId: ID): number | null {
    const studentAverages: {
      id: ID;
      grade: Grade;
    }[] = [];

    for (const id of this.studentIds) {
      const studentAverage = this.calculateStudentAverage(id);

      studentAverages.push({ id, grade: studentAverage });
    }

    const rank = Grade.calculateRank(studentAverages, studentId);

    return rank;
  }

  calculateHighestAverage(): Grade {
    const averages = this.studentIds
      .map(studentId => this.calculateStudentAverage(studentId).mark)
      .filter(value => value !== null);

    const sortedAverages = averages.sort((a, b) => b - a);

    return Grade.create(this.term.coefficient, sortedAverages[0] ?? null);
  }

  calculateLowestAverage(): Grade {
    const averages = this.studentIds
      .map(studentId => this.calculateStudentAverage(studentId).mark)
      .filter(value => value !== null);

    const sortedAverages = averages.sort((a, b) => a - b);

    return Grade.create(this.term.coefficient, sortedAverages[0] ?? null);
  }

  getTotalAverage(): Grade {
    const studentAverages = this.studentIds.map(studentId =>
      this.calculateStudentAverage(studentId),
    );

    return Grade.calculateAverage(studentAverages, this.term.coefficient);
  }

  calculateAvgAbove10(): {
    number: number;
    percentage: string;
  } {
    if (this.studentIds.length === 0) return { number: 0, percentage: "0%" };

    const studentAveragesAbove10 = this.studentIds
      .map(studentId => this.calculateStudentAverage(studentId))
      .filter(average => average.mark !== null && average.mark >= 10);

    const totalStudent = this.studentIds.length;
    const totalStudentAbove10 = studentAveragesAbove10.length;

    return {
      number: totalStudentAbove10,
      percentage: `${Math.trunc((totalStudentAbove10 / totalStudent) * 100)}%`,
    };
  }

  calculateAvgBelow10(): {
    number: number;
    percentage: string;
  } {
    if (this.studentIds.length === 0) return { number: 0, percentage: "0%" };

    const studentAveragesBelow10 = this.studentIds
      .map(studentId => this.calculateStudentAverage(studentId))
      .filter(average => average.mark !== null && average.mark < 10);

    const totalStudent = this.studentIds.length;
    const totalStudentBelow10 = studentAveragesBelow10.length;

    return {
      number: totalStudentBelow10,
      percentage: `${Math.trunc((totalStudentBelow10 / totalStudent) * 100)}%`,
    };
  }

  getDegreesCoverage(): number {
    const fieldCoverages = this.fields.map(field => field.getDegreesCoverage());

    return Math.min(...fieldCoverages);
  }

  getTeachers(): UserProfileDTO[] {
    const classTeachers: UserProfileDTO[] = [];

    for (const field of this.fields) {
      const fieldTeachers = field.getTeachers();

      for (const fieldTeacher of fieldTeachers) {
        if (classTeachers.every(teacher => teacher._id !== fieldTeacher._id))
          classTeachers.push(fieldTeacher);
      }
    }

    return classTeachers;
  }
}
