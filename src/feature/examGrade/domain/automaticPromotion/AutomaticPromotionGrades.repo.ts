import { injectable } from "inversify";
import { AutomaticPromotionTermClassGrades } from "./AutomaticPromotionTermClassGrades.entity";
import { ClassRepo } from "../../../classes/domain/Class.repo";
import { inject } from "../../../../core/container/TypedContainer";
import { ID } from "../../../../types/BaseEntity";
import { TermRepo } from "../../../terms/repos/Term.repo";
import { AutomaticPromotionAnnualClassGrades } from "./AutomaticPromotionAnnualClassGrades.entity";

@injectable()
export class AutomaticPromotionGradesRepo {
  constructor(
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("TermRepo") private termRepo: TermRepo,
  ) {}

  async loadTermClassGrades(classId: ID, termId: ID): Promise<AutomaticPromotionTermClassGrades> {
    const classDoc = await this.classRepo.findOneByIdOrThrow(classId, "global.internalError");
    const termDoc = await this.termRepo.findOneByIdOrThrow(termId, "global.internalError");

    return new AutomaticPromotionTermClassGrades({
      classDoc: { _id: classId, newId: classDoc.newId, name: classDoc.name },
      term: {
        _id: termId,
        newId: termDoc.newId,
        name: termDoc.name,
        coefficient: termDoc.coefficient,
      },
      studentIds: classDoc.students,
    });
  }

  async loadAnnualClassGrades(
    classId: ID,
    termIds: ID[],
  ): Promise<AutomaticPromotionAnnualClassGrades> {
    const termClassGrades = await Promise.all(
      termIds.map(termId => this.loadTermClassGrades(classId, termId)),
    );

    return new AutomaticPromotionAnnualClassGrades(termClassGrades);
  }
}
