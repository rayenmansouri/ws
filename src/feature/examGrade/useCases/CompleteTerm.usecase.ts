import { injectable } from "inversify";
import { ClassGradeFactory } from "../factories/classGrade.factory";
import { inject } from "../../../core/container/TypedContainer";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { TermRepo } from "../../terms/repos/Term.repo";
import { LevelRepo } from "../../levels/repos/Level.repo";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { INSTANCE_TYPE_ENUM, School } from "../../schools/domain/school.entity";

@injectable()
export class CompleteTermUseCase {
  constructor(
    @inject("ClassGradeFactory") private classGradeFactory: ClassGradeFactory,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("TermRepo") private termRepo: TermRepo,
    @inject("LevelRepo") private levelRepo: LevelRepo,
    @inject("School") private school: School,
  ) {}

  async execute(classNewId: string, termNewId: string): Promise<void> {
    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class", {
      populate: ["schoolYear"],
    });
    const termDoc = await this.termRepo.findOneByNewIdOrThrow(termNewId, "notFound.term");
    const termIndex = classDoc.schoolYear.terms.findIndex(term => term.newId === termNewId);
    if (termIndex === -1) throw new BadRequestError("term.invalid");

    const isPreviousTermIncomplete = termIndex !== 0 && classDoc.gradeReports.length !== termIndex;
    if (isPreviousTermIncomplete) throw new BadRequestError("term.previousTermNotCompleted");

    const isTermCompleted = classDoc.gradeReports.some(
      gradeReport => gradeReport.term === termDoc._id,
    );
    if (isTermCompleted) throw new BadRequestError("term.isCompleted");

    if (this.school.instanceType !== INSTANCE_TYPE_ENUM.IB) {
      const levelDoc = await this.levelRepo.findOneByIdOrThrow(
        classDoc.schoolYear.level,
        "notFound.level",
      );
      const classGrade = await this.classGradeFactory.createTermGrade({
        classId: classDoc._id,
        termId: termDoc._id,
        examGradeSystem: levelDoc.examGradeSystem,
        schoolInstance: this.school.instanceType,
      });
      const degreesCoverage = classGrade.getDegreesCoverage();
      const canTermBeCompleted = degreesCoverage === classGrade.studentIds.length;
      if (!canTermBeCompleted) throw new BadRequestError("term.cannotBeCompleted");
    }

    await this.classRepo.completeTerm(classDoc._id, termDoc._id);
  }
}
