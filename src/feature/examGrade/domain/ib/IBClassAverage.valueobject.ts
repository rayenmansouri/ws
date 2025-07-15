import { IGrade } from "../Grade.interface";
import { DISPENSED_STATUS } from "../tunisian/ExamGrade.entity";
import { IBSubjectAverage } from "./IBSubjectAverage.valueobject";

export const IB_ANNUAL_GRADE_LEVELS_ENUM = {
  N0: "N0",
  N1: "N1",
  N2: "N2",
  N3: "N3",
} as const;
export type TIBAnnualGradeLevelsEnum =
  (typeof IB_ANNUAL_GRADE_LEVELS_ENUM)[keyof typeof IB_ANNUAL_GRADE_LEVELS_ENUM];

export class IBClassAverage implements IGrade {
  readonly total: number | null;
  readonly mark: number | null;
  readonly isDispensed: boolean;

  protected constructor(mark: number | null, total: number | null, isDispensed: boolean) {
    this.mark = mark;
    this.total = total;
    this.isDispensed = isDispensed;
  }

  static createFromSubjectAverages(grades: IBSubjectAverage[]): IBClassAverage {
    if (grades.every(grade => grade.isDispensed)) return new IBClassAverage(null, null, true);
    if (grades.every(grade => grade.mark === null)) return new IBClassAverage(null, null, false);

    const total = grades.reduce((acc, grade) => {
      if (grade.mark === null) return acc;

      return acc + IBSubjectAverage.MAX_MARK;
    }, 0);

    const mark = grades.reduce((acc, grade) => {
      if (grade.mark === null) return acc;

      return acc + grade.mark;
    }, 0);

    return new IBClassAverage(mark, total, false);
  }

  static createAnnualAverage(grades: IBClassAverage[]): IBClassAverage {
    if (grades.every(grade => grade.isDispensed)) return new IBClassAverage(null, null, true);
    if (grades.every(grade => grade.mark === null)) return new IBClassAverage(null, null, false);

    const total = grades.reduce((acc, grade) => {
      if (grade.mark === null) return acc;

      return acc + grade.total!;
    }, 0);

    const mark = grades.reduce((acc, grade) => {
      if (grade.mark === null) return acc;

      return acc + grade.mark;
    }, 0);

    return new IBClassAverage(mark, total, false);
  }

  format(): string | null {
    if (this.isDispensed) return DISPENSED_STATUS;

    if (this.mark === null) return null;

    return `${this.mark}/${this.total}`;
  }

  isPromoted(): boolean {
    if (this.isDispensed) return false;

    if (this.mark === null) return false;

    return this.mark / this.total! >= 0.5;
  }

  getLevel(): TIBAnnualGradeLevelsEnum | null {
    if (this.total === null || this.mark === null) return null;

    const grade = this.mark / this.total;

    if (grade < 1 / 2) return IB_ANNUAL_GRADE_LEVELS_ENUM.N0;
    if (grade >= 1 / 2 && grade < 2 / 3) return IB_ANNUAL_GRADE_LEVELS_ENUM.N1;
    if (grade >= 2 / 3 && grade < 5 / 6) return IB_ANNUAL_GRADE_LEVELS_ENUM.N2;
    if (grade >= 5 / 6) return IB_ANNUAL_GRADE_LEVELS_ENUM.N3;

    return null;
  }
}
