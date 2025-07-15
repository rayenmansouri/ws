import { BadRequestError } from "../../../../core/ApplicationErrors";
import { DISPENSED_STATUS } from "../tunisian/ExamGrade.entity";

export class IBGrade {
  static MAX_MARK = 8;

  readonly mark: number | null;
  readonly isDispensed: boolean;

  protected constructor(mark: number | null, isDispensed: boolean) {
    this.mark = mark;
    this.isDispensed = isDispensed;
  }

  static create(mark: number | string | null): IBGrade {
    if (mark === DISPENSED_STATUS) return new IBGrade(null, true);

    if (typeof mark === "string" && isNaN(+mark)) throw new BadRequestError("grade.invalidMark");

    if (mark === null) return new IBGrade(null, false);

    if (+mark < 0 || +mark > this.MAX_MARK) throw new BadRequestError("grade.invalidMark");

    return new IBGrade(+mark, false);
  }

  format(): string | null {
    if (this.isDispensed) return DISPENSED_STATUS;

    if (this.mark === null) return null;

    return this.mark.toString();
  }
}
