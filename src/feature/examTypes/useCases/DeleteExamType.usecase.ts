import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { ClassTypeRepo } from "../../classTypes/repo/ClassType.repo";
import { GroupTypeRepo } from "../../groupManagement/repos/GroupType.repo";
import { ExamTypeRepo } from "../repos/examType.repo";

@injectable()
export class DeleteExamTypeUseCase {
  constructor(
    @inject("ExamTypeRepo") private examTypeRepo: ExamTypeRepo,
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
    @inject("GroupTypeRepo") private groupTypeRepo: GroupTypeRepo,
  ) {}

  async execute(examTypeNewId: string): Promise<void> {
    const examType = await this.examTypeRepo.findOneByNewIdOrThrow(
      examTypeNewId,
      "notFound.examType",
    );
    const classTypeUseExamType = await this.classTypeRepo.findOneByExamType(examType._id);
    if (classTypeUseExamType) throw new BadRequestError("alreadyUsed.examType");

    const groupTypeUseExamType = await this.groupTypeRepo.findOneByExamType(examType._id);
    if (groupTypeUseExamType) throw new BadRequestError("alreadyUsed.examType");

    await this.examTypeRepo.deleteOneById(examType._id);
  }
}
