import { IGrade } from "../Grade.interface";

export class AutomaticPromotionGrade implements IGrade {
  coefficient: number;
  mark: number | null;
  isDispensed: boolean;

  protected constructor(coefficient: number, mark: number | null, isDispensed: boolean) {
    this.coefficient = coefficient;
    this.mark = mark;
    this.isDispensed = isDispensed;
  }

  static create(): AutomaticPromotionGrade {
    return new AutomaticPromotionGrade(1, null, false);
  }

  format(): string | null {
    return null;
  }

  isPromoted(): boolean {
    return true;
  }
}
