import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { TutorialRepo } from "../domain/Tutorial.repo";

type AddTutorialUseCaseInput = {
  title: string;
  link: string;
  interfaceKeys: string[];
};

@injectable()
export class AddTutorialUseCase {
  constructor(@inject("TutorialRepo") private tutorialRepo: TutorialRepo) {}

  async execute(input: AddTutorialUseCaseInput): Promise<void> {
    const { title, link, interfaceKeys } = input;

    await this.tutorialRepo.addOne({
      title,
      link,
      interfaceKeys,
    });

    return;
  }
}
