import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ExamTypeRepo } from "../repos/examType.repo";

@injectable()
export class AddExamTypeUseCase {
  constructor(@inject("ExamTypeRepo") private examTypeRepo: ExamTypeRepo) {}

  async execute(data: { name: string }): Promise<void> {
    await this.examTypeRepo.ensureFieldUniqueness("name", data.name, "alreadyUsed.name");

    const examTypes = await this.examTypeRepo.findAll();

    const ranks = examTypes.map(examType => examType.rank);

    const newRank = ranks.length === 0 ? 0 : Math.max(...ranks) + 1;

    await this.examTypeRepo.addOne({ ...data, rank: newRank });
  }
}
