import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { TutorialRepo } from "../domain/Tutorial.repo";

type deleteTutorialUseCaseParams = {
  tutorialNewId: string;
};

@injectable()
export class DeleteTutorialUseCase {
  constructor(@inject("TutorialRepo") private tutorialRepo: TutorialRepo) {}

  async execute(data: deleteTutorialUseCaseParams): Promise<void> {
    const { tutorialNewId } = data;

    const tutorial = await this.tutorialRepo.findOneByNewIdOrThrow(
      tutorialNewId,
      "notFound.tutorial",
    );

    await this.tutorialRepo.deleteOneById(tutorial._id);
  }
}
