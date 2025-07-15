import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { TermRepo } from "../repos/Term.repo";

type AddTermUseCaseRequest = {
  name: string;
  coefficient: number;
};

@injectable()
export class AddTermUseCase {
  constructor(@inject("TermRepo") private termRepo: TermRepo) {}

  async execute(data: AddTermUseCaseRequest): Promise<void> {
    await this.termRepo.ensureFieldUniqueness("name", data.name, "alreadyUsed.name");

    await this.termRepo.addOne(data);

    return;
  }
}
