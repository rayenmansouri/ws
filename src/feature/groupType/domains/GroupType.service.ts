import { BadRequestError } from "../../../core/ApplicationErrors";

export class GroupTypeService {
  static ensureGroupTypeHasExamWhenIncludeInGradeBook(groupType: {
    coefficient: number | null;
    exams: unknown[];
  }): void {
    const hasExam = groupType.exams.length > 0;

    if (hasExam && groupType.coefficient === null) {
      throw new BadRequestError("groupRules.coefficientAndExamNotValid");
    }

    if (!hasExam && groupType.coefficient !== null) {
      throw new BadRequestError("groupRules.coefficientAndExamNotValid");
    }
  }
}
