import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { GroupTypeRepo } from "../../groupManagement/repos/GroupType.repo";

type addGroupTypeParams = {
  name: string;
  coefficient: number | null;
  exams: { examTypeNewId: string; coefficient: number }[];
  illustration: string;
};

@injectable()
export class AddGroupTypeUseCase {
  constructor(@inject("GroupTypeRepo") private groupTypeRepo: GroupTypeRepo) {}

  async execute(data: addGroupTypeParams): Promise<void> {
    await this.groupTypeRepo.ensureFieldUniqueness("name", data.name, "alreadyUsed.name");

    await this.groupTypeRepo.addOne({
      name: data.name,
      coefficient: data.coefficient,
      illustration: data.illustration,
    });
  }
}
