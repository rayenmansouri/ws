import { BadRequestError } from "../../../../core/ApplicationErrors";
import { ID } from "../../../../types/BaseEntity";
import { IGrade } from "../Grade.interface";
import { DISPENSED_STATUS } from "../tunisian/ExamGrade.entity";

type CambridgeLetterGrade = "A" | "B" | "C" | "D" | "E" | "F";

export class CambridgeGrade implements IGrade {
  static MAX_MARK = 100;
  static readonly letterGradeRanges: Record<CambridgeLetterGrade, { min: number; max: number }> = {
    A: { min: 85, max: 100 },
    B: { min: 75, max: 84 },
    C: { min: 65, max: 74 },
    D: { min: 55, max: 64 },
    E: { min: 45, max: 54 },
    F: { min: 0, max: 44 },
  };

  readonly coefficient: number;
  readonly mark: number | null;
  readonly isDispensed: boolean;

  protected constructor(coefficient: number, mark: number | null, isDispensed: boolean) {
    this.coefficient = coefficient;
    this.mark = mark;
    this.isDispensed = isDispensed;
  }

  static create(coefficient: number, mark: number | string | null): CambridgeGrade {
    if (coefficient <= 0) throw new BadRequestError("grade.coefficientMustBePositive");

    if (mark === DISPENSED_STATUS) return new CambridgeGrade(coefficient, null, true);

    if (typeof mark === "string" && isNaN(+mark)) throw new BadRequestError("grade.invalidMark");

    if (mark === null) return new CambridgeGrade(coefficient, null, false);

    if (+mark < 0 || +mark > this.MAX_MARK) throw new BadRequestError("grade.invalidMark");

    return new CambridgeGrade(coefficient, +mark, false);
  }

  static calculateAverage(grades: CambridgeGrade[], coefficient = 1): CambridgeGrade {
    if (grades.length === 0) return new CambridgeGrade(0, null, false);

    if (grades.every(grade => grade.mark === null && grade.isDispensed))
      return new CambridgeGrade(0, null, true);

    if (grades.every(grade => grade.mark === null)) return new CambridgeGrade(0, null, false);

    let totalCoefficient = 0;
    let totalMark = 0;

    for (const grade of grades) {
      if (grade.mark === null) continue;

      totalCoefficient += grade.coefficient;
      totalMark += grade.mark * grade.coefficient;
    }

    const average = Math.round(totalMark / totalCoefficient);

    return new CambridgeGrade(coefficient, average, false);
  }

  static calculateRank(GradeList: { id: ID; grade: CambridgeGrade }[], gradeId: ID): number | null {
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

    return this.mark.toString();
  }

  getLetterGrade(): CambridgeLetterGrade | null {
    const mark = this.mark;

    if (mark === null) return null;

    for (const [letterGrade, range] of Object.entries(CambridgeGrade.letterGradeRanges)) {
      if (mark >= range.min && mark <= range.max) {
        return letterGrade as CambridgeLetterGrade;
      }
    }

    return null;
  }

  getEquivalence(): string | null {
    if (this.mark === null) return null;

    return (this.mark / 5).toFixed(2);
  }

  isPromoted(): boolean {
    return true;
  }
}
