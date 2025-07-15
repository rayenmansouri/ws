import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { TutorialRepo } from "../domain/Tutorial.repo";

type UpdateTutorialUseCaseInput = Partial<{
  title: string;
  link: string;
  interfaceKeys: string[];
}> & { tutorialNewId: string };

@injectable()
export class UpdateTutorialUseCase {
  constructor(@inject("TutorialRepo") private tutorialRepo: TutorialRepo) {}

  async execute(data: UpdateTutorialUseCaseInput): Promise<void> {
    const { title, link, interfaceKeys, tutorialNewId } = data;

    const tutorial = await this.tutorialRepo.findOneByNewIdOrThrow(
      tutorialNewId,
      "notFound.tutorial",
    );

    await this.tutorialRepo.updateOneById(tutorial._id, { title, link, interfaceKeys });
  }
}
