import { ExamType } from "../domains/examType.entity";
import { ExamTypeDto } from "../dtos/ExamType.dto";

export class ExamTypeMapper {
  constructor() {}
  static toExamTypeDto(examType: ExamType): ExamTypeDto {
    return {
      _id: examType._id,
      name: examType.name,
      rank: examType.rank,
      newId: examType.newId,
    };
  }
}
