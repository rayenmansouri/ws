import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ClassRepo } from "../domain/Class.repo";

@injectable()
export class UpdateClassUseCase {
  constructor(@inject("ClassRepo") private classRepo: ClassRepo) {}

  async execute(classNewId: string, name: string): Promise<void> {
    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class");

    if (classDoc.name === name) return;

    await this.classRepo.ensureNameIsUniqueInSchoolYear(name, classDoc.schoolYear);

    await this.classRepo.updateOneById(classDoc._id, { name });
  }
}
