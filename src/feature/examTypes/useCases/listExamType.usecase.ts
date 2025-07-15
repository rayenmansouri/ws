import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ExamTypeRepo } from "../repos/examType.repo";
import { ExamTypeMapper } from "../mappers/ExamType.mapper";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ExamTypeDto } from "../dtos/ExamType.dto";
import { ListOptions } from "../../../types/types";

@injectable()
export class ListExamTypeUseCase {
  constructor(@inject("ExamTypeRepo") private examTypeRepo: ExamTypeRepo) {}

  async execute(
    query: { name?: string } & ListOptions,
  ): Promise<ResponseWithPagination<ExamTypeDto>> {
    const examTypes = await this.examTypeRepo.list(query);

    const docs = examTypes.docs.map(doc => ExamTypeMapper.toExamTypeDto(doc));

    return { docs, meta: examTypes.meta };
  }
}
