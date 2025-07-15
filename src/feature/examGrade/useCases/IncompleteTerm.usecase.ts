import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { TermRepo } from "../../terms/repos/Term.repo";

@injectable()
export class IncompleteTermUseCase {
  constructor(
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("TermRepo") private termRepo: TermRepo,
  ) {}

  async execute(termNewId: string, classNewId: string): Promise<void> {
    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class");
    const term = await this.termRepo.findOneByNewIdOrThrow(termNewId, "notFound.term");

    if (classDoc.gradeReports.length === 0) throw new BadRequestError("term.notCompleted");

    const lastTermCompleted = classDoc.gradeReports.pop()!.term;

    if (lastTermCompleted !== term._id)
      throw new BadRequestError("term.previousTermsNeedToBeUncompleted");

    await this.classRepo.incompleteTerm(classDoc._id, term._id);
  }
}
