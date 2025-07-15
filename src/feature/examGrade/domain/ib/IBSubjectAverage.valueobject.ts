import { BadRequestError } from "../../../../core/ApplicationErrors";
import { DISPENSED_STATUS } from "../tunisian/ExamGrade.entity";
import { IBGrade } from "./IBGrade.valueobject";

export class IBSubjectAverage {
  static readonly MAX_MARK = 7;

  static readonly rangesForFourExams: Record<number, { min: number; max: number }> = {
    0: { min: 0, max: 0 },
    1: { min: 1, max: 5 },
    2: { min: 6, max: 9 },
    3: { min: 10, max: 14 },
    4: { min: 15, max: 18 },
    5: { min: 19, max: 23 },
    6: { min: 24, max: 27 },
    7: { min: 28, max: 32 },
  };

  static readonly rangesForThreeExams: Record<number, { min: number; max: number }> = {
    0: { min: 0, max: 0 },
    1: { min: 1, max: 3 },
    2: { min: 4, max: 6 },
    3: { min: 7, max: 10 },
    4: { min: 11, max: 13 },
    5: { min: 14, max: 17 },
    6: { min: 18, max: 20 },
    7: { min: 21, max: 24 },
  };

  readonly mark: number | null;
  readonly isDispensed: boolean;

  protected constructor(mark: number | null, isDispensed: boolean) {
    this.mark = mark;
    this.isDispensed = isDispensed;
  }

  static create(grades: IBGrade[]): IBSubjectAverage {
    if (grades.some(grade => grade.isDispensed)) return new IBSubjectAverage(null, true);

    if (grades.some(grade => grade.mark === null)) return new IBSubjectAverage(null, false);

    const total = grades.reduce((acc, grade) => acc + grade.mark!, 0);

    let ranges = this.rangesForFourExams;
    if (grades.length === 3) ranges = this.rangesForThreeExams;

    for (const [average, range] of Object.entries(ranges)) {
      if (total >= range.min && total <= range.max) return new IBSubjectAverage(+average, false);
    }

    throw new BadRequestError("grade.invalidMark");
  }

  format(): string | null {
    if (this.isDispensed) return DISPENSED_STATUS;

    if (this.mark === null) return null;

    return this.mark.toString();
  }
}
