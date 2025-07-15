import { BadRequestError } from "../../../../core/ApplicationErrors";
import { ID } from "../../../../types/BaseEntity";
import { DISPENSED_STATUS } from "./ExamGrade.entity";

export class Grade {
  static MAX_MARK = 20;

  readonly coefficient: number;
  readonly mark: number | null;
  readonly isDispensed: boolean;

  protected constructor(coefficient: number, mark: number | null, isDispensed: boolean) {
    this.coefficient = coefficient;
    this.mark = mark;
    this.isDispensed = isDispensed;
  }

  static create(coefficient: number, mark: number | string | null): Grade {
    if (coefficient <= 0) throw new BadRequestError("grade.coefficientMustBePositive");

    if (mark === DISPENSED_STATUS) return new Grade(coefficient, null, true);

    if (typeof mark === "string" && isNaN(+mark)) throw new BadRequestError("grade.invalidMark");

    if (mark === null) return new Grade(coefficient, null, false);

    if (+mark < 0 || +mark > this.MAX_MARK) throw new BadRequestError("grade.invalidMark");

    return new Grade(coefficient, +mark, false);
  }

  static calculateAverage(grades: Grade[], coefficient = 1): Grade {
    if (grades.length === 0) return new Grade(0, null, false);

    if (grades.every(grade => grade.mark === null && grade.isDispensed))
      return new Grade(0, null, true);

    if (grades.every(grade => grade.mark === null)) return new Grade(0, null, false);

    let totalCoefficient = 0;
    let totalMark = 0;

    for (const grade of grades) {
      if (grade.mark === null) continue;

      totalCoefficient += grade.coefficient;
      totalMark += grade.mark * grade.coefficient;
    }

    const average = Math.trunc((totalMark / totalCoefficient) * 100) / 100;

    return new Grade(coefficient, average, false);
  }

  static calculateRank(GradeList: { id: ID; grade: Grade }[], gradeId: ID): number | null {
    const averages: { id: ID; average: number }[] = [];

    for (const { grade, id } of GradeList) {
      if (grade.mark === null && id === gradeId) return null;

      if (grade.mark === null) continue;

      averages.push({ id, average: grade.mark });
    }

    const sortedAverages = averages.sort((a, b) => b.average - a.average);

    const rank = sortedAverages.findIndex(average => average.id === gradeId);

    return rank + 1;
  }

  format(): string | null {
    if (this.isDispensed) return DISPENSED_STATUS;

    if (this.mark === null) return null;

    return this.mark.toFixed(2);
  }

  isPromoted(): boolean {
    if (this.mark === null) return false;

    return this.mark >= 10;
  }
}
