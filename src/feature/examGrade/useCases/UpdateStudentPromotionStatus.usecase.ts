import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { StudentRepo } from "../../students/domain/Student.repo";
import { OmitFromEnum } from "../../../types/utils/enums.util";
import { PROMOTION_STATUS_ENUM, TPromotionStatusEnum } from "../domain/tunisian/ExamGrade.entity";
import { StudentApplicationService } from "../../students/application/Student.application.service";
import { StudentProfileRepo } from "../../students/domain/StudentProfile.repo";

@injectable()
export class UpdateStudentPromotionStatusUsecase {
  constructor(
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("StudentApplicationService")
    private studentApplicationService: StudentApplicationService,
    @inject("StudentProfileRepo") private studentProfileRepo: StudentProfileRepo,
  ) {}

  async execute(
    studentNewId: string,
    promotionStatus: OmitFromEnum<TPromotionStatusEnum, "PROMOTED">,
  ): Promise<void> {
    const student = await this.studentRepo.findOneByNewIdOrThrow(studentNewId, "notFound.student");

    const { studentProfile } = await this.studentApplicationService.getCurrentAcademicDetails(
      student,
    );

    const isExceptionallyPromoted =
      promotionStatus === PROMOTION_STATUS_ENUM.EXCEPTIONALLY_PROMOTED;

    await this.studentProfileRepo.updateOneById(studentProfile._id, {
      isExceptionallyPromoted,
    });
  }
}
