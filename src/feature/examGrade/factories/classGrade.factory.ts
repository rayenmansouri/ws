import { injectable } from "inversify";
import { InternalError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { ID } from "../../../types/BaseEntity";
import { EXAM_GRADE_SYSTEM_ENUM, TExamGradeSystemEnum } from "../../levels/domains/level.entity";
import { CambridgeClassGradesRepo } from "../domain/cambridge/CambridgeClassGrades.repo";
import { PrimaryClassGradesRepo } from "../domain/tunisian/primary/PrimaryClassGrades.repo";
import { SecondaryClassGradesRepo } from "../domain/tunisian/secondary/SecondaryClassGrades.repo";
import { ITermClassGrades } from "../domain/TermClassGrades.interface";
import { IAnnualClassGrades } from "../domain/AnnualClassGrades.interface";
import { AutomaticPromotionGradesRepo } from "../domain/automaticPromotion/AutomaticPromotionGrades.repo";
import { INSTANCE_TYPE_ENUM, TInstanceTypeEnum } from "../../schools/domain/school.entity";
import { IBClassGradesRepo } from "../domain/ib/IBClassGrades.repo";

@injectable()
export class ClassGradeFactory {
  constructor(
    @inject("PrimaryClassGradesRepo") private primaryClassGradesRepo: PrimaryClassGradesRepo,
    @inject("SecondaryClassGradesRepo") private secondaryClassGradesRepo: SecondaryClassGradesRepo,
    @inject("CambridgeClassGradesRepo") private cambridgeClassGradesRepo: CambridgeClassGradesRepo,
    @inject("AutomaticPromotionGradesRepo")
    private automaticPromotionGradesRepo: AutomaticPromotionGradesRepo,
    @inject("IBClassGradesRepo") private ibClassGradesRepo: IBClassGradesRepo,
  ) {}

  async createTermGrade({
    classId,
    termId,
    examGradeSystem,
    schoolInstance,
  }: {
    classId: ID;
    termId: ID;
    schoolInstance: TInstanceTypeEnum;
    examGradeSystem: TExamGradeSystemEnum | null;
  }): Promise<ITermClassGrades> {
    if (examGradeSystem === EXAM_GRADE_SYSTEM_ENUM.AUTOMATIC_PROMOTION)
      return this.automaticPromotionGradesRepo.loadTermClassGrades(classId, termId);

    switch (schoolInstance) {
      case INSTANCE_TYPE_ENUM.TUNISIAN:
        if (examGradeSystem === EXAM_GRADE_SYSTEM_ENUM.PRIMARY)
          return this.primaryClassGradesRepo.loadTermClassGrades(classId, termId);

        if (examGradeSystem === EXAM_GRADE_SYSTEM_ENUM.SECONDARY)
          return this.secondaryClassGradesRepo.loadTermClassGrades(classId, termId);

        throw new InternalError("global.internalError");
      case INSTANCE_TYPE_ENUM.CAMBRIDGE:
        return this.cambridgeClassGradesRepo.loadTermClassGrades(classId, termId);
      case INSTANCE_TYPE_ENUM.IB:
        return this.ibClassGradesRepo.loadTermClassGrades(classId, termId);
    }
  }

  async createAnnualGrade({
    classId,
    termIds,
    examGradeSystem,
    schoolInstance,
  }: {
    classId: ID;
    termIds: ID[];
    examGradeSystem: TExamGradeSystemEnum | null;
    schoolInstance: TInstanceTypeEnum;
  }): Promise<IAnnualClassGrades> {
    if (examGradeSystem === EXAM_GRADE_SYSTEM_ENUM.AUTOMATIC_PROMOTION)
      return this.automaticPromotionGradesRepo.loadAnnualClassGrades(classId, termIds);

    switch (schoolInstance) {
      case INSTANCE_TYPE_ENUM.TUNISIAN:
        if (examGradeSystem === EXAM_GRADE_SYSTEM_ENUM.PRIMARY)
          return this.primaryClassGradesRepo.loadAnnualClassGrades(classId, termIds);

        if (examGradeSystem === EXAM_GRADE_SYSTEM_ENUM.SECONDARY)
          return this.secondaryClassGradesRepo.loadAnnualClassGrades(classId, termIds);

        throw new InternalError("global.internalError");
      case INSTANCE_TYPE_ENUM.CAMBRIDGE:
        return this.cambridgeClassGradesRepo.loadAnnualClassGrades(classId, termIds);
      case INSTANCE_TYPE_ENUM.IB:
        return this.ibClassGradesRepo.loadAnnualClassGrades(classId, termIds);
    }
  }
}
