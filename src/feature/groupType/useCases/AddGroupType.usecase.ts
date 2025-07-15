import { injectable } from "inversify/lib/inversify";
import { InternalError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { ExamTypeRepo } from "../../examTypes/repos/examType.repo";
import { GroupTypeRepo } from "../../groupManagement/repos/GroupType.repo";
import { GroupTypeService } from "../domains/GroupType.service";

type addGroupTypeParams = {
  name: string;
  coefficient: number | null;
  exams: { examTypeNewId: string; coefficient: number }[];
  illustration: string;
};

@injectable()
export class AddGroupTypeUseCase {
  constructor(
    @inject("GroupTypeRepo") private groupTypeRepo: GroupTypeRepo,
    @inject("ExamTypeRepo") private examTypeRepo: ExamTypeRepo,
  ) {}

  async execute(data: addGroupTypeParams): Promise<void> {
    await this.groupTypeRepo.ensureFieldUniqueness("name", data.name, "alreadyUsed.name");

    const examTypeNewIds = data.exams.map(exam => exam.examTypeNewId);

    const examTypes = await this.examTypeRepo.findManyByNewIdsOrThrow(
      examTypeNewIds,
      "notFound.examType",
    );

    const exams = data.exams.map(exam => {
      const examTypeId = examTypes.find(examType => examType.newId === exam.examTypeNewId)?._id;
      if (!examTypeId) throw new InternalError("Exam Type not found");
      return { examType: examTypeId, coefficient: exam.coefficient };
    });

    GroupTypeService.ensureGroupTypeHasExamWhenIncludeInGradeBook({
      exams: exams,
      coefficient: data.coefficient,
    });

    await this.groupTypeRepo.addOne({
      name: data.name,
      coefficient: data.coefficient,
      exams: exams,
      illustration: data.illustration,
    });
  }
}
