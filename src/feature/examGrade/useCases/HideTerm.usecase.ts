import { injectable } from "inversify";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { TermRepo } from "../../terms/repos/Term.repo";
import { inject } from "../../../core/container/TypedContainer";
import { BadRequestError } from "../../../core/ApplicationErrors";

@injectable()
export class HideTermUseCase {
  constructor(
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("TermRepo") private termRepo: TermRepo,
  ) {}

  async execute(classNewId: string, termNewId: string): Promise<void> {
    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class");
    const termDoc = await this.termRepo.findOneByNewIdOrThrow(termNewId, "notFound.term");

    const termGradeReport = classDoc.gradeReports.find(report => report.term === termDoc._id);
    if (!termGradeReport) throw new BadRequestError("term.notCompleted");

    if (!termGradeReport.isPublished) throw new BadRequestError("term.notPublished");

    await this.classRepo.hideTerm(classDoc._id, termDoc._id);
  }
}
