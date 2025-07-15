import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { Student } from "../../students/domain/student.entity";
import { ParentRepo } from "../domain/Parent.repo";

@injectable()
export class GetChildrenOfParentUseCase {
  constructor(@inject("ParentRepo") private parentRepo: ParentRepo) {}

  async execute(parentNewId: string): Promise<Student[]> {
    const parent = await this.parentRepo.findOneByNewIdOrThrow(parentNewId, "notFound.parent", {
      populate: ["students"],
    });

    const children = parent.students.filter(student => !student.isArchived);

    return children;
  }
}
