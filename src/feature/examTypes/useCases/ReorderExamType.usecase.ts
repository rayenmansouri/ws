import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ExamTypeRepo } from "../repos/examType.repo";
import { NotFoundError } from "../../../core/ApplicationErrors";
import { ClassTypeService } from "../../classTypes/domains/ClassType.service";

@injectable()
export class ReorderExamTypeUseCase {
  constructor(@inject("ExamTypeRepo") private examTypeRepo: ExamTypeRepo) {}

  async execute(examTypeNewId: string, newRank: number): Promise<void> {
    const examTypes = (await this.examTypeRepo.findAll()).sort((a, b) => a.rank - b.rank);

    const examType = examTypes.find(examType => examType.newId === examTypeNewId);

    if (!examType) throw new NotFoundError("notFound.examType");

    const newExamTypes = ClassTypeService.reorderArray(examTypes, examType.rank, newRank);

    await Promise.all(
      newExamTypes.map((examType, index) => {
        return this.examTypeRepo.updateOneById(examType._id, { rank: index });
      }),
    );
  }
}
