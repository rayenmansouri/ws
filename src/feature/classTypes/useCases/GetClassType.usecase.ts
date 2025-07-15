import { injectable } from "inversify/lib/inversify";
import { pick } from "lodash";
import { inject } from "../../../core/container/TypedContainer";
import { ClassType } from "../repo/classType.entity";
import { ClassTypeRepo } from "../repo/ClassType.repo";

@injectable()
export class GetClassTypeUseCase {
  constructor(@inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo) {}

  async execute(classTypeNewId: string): Promise<Pick<ClassType, "newId" | "_id" | "name">> {
    const classType = await this.classTypeRepo.findOneByNewIdOrThrow(
      classTypeNewId,
      "notFound.classType",
    );

    return pick(classType, ["_id", "newId", "name"]);
  }
}
