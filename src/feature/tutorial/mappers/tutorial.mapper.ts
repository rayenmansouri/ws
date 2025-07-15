import { Tutorial } from "../domain/tutorial.entity";
import { TutorialDto } from "../dtos/tutorial.dto";

export class TutorialMapper {
  static toDto(tutorial: Tutorial): TutorialDto {
    return {
      _id: tutorial._id,
      newId: tutorial.newId,
      title: tutorial.title,
      link: tutorial.link,
      interfaceKeys: tutorial.interfaceKeys,
    };
  }
}
