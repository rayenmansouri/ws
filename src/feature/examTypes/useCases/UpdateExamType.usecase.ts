import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ExamTypeRepo } from "../repos/examType.repo";

@injectable()
export class UpdateExamTypeUseCase {
  constructor(@inject("ExamTypeRepo") private examTypeRepo: ExamTypeRepo) {}

  async execute(examTypeNewId: string, data: Partial<{ name: string }>): Promise<void> {
    const examType = await this.examTypeRepo.findOneByNewIdOrThrow(
      examTypeNewId,
      "notFound.examType",
    );

    if (data.name && data.name !== examType.name) {
      await this.examTypeRepo.ensureFieldUniqueness("name", data.name, "alreadyUsed.name");
    }

    await this.examTypeRepo.updateOneById(examType._id, data);
  }
}
