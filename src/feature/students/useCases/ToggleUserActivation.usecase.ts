import { injectable } from "inversify";
import { TEndUserEnum } from "../../../constants/globalEnums";
import { inject } from "../../../core/container/TypedContainer";
import { UsersRepo } from "../../users/domain/user.repo";

type ToggleUserActivationUseCaseInput = {
  userNewId: string;
  userType: TEndUserEnum;
};

@injectable()
export class ToggleUserActivationUseCase {
  constructor(@inject("UsersRepo") private userRepp: UsersRepo) {}

  async execute(data: ToggleUserActivationUseCaseInput): Promise<void> {
    const { userNewId, userType } = data;
    const user = await this.userRepp.findUserByNewIdOrThrow(userType, userNewId);

    const isActive = !user.isActive;

    await this.userRepp.updateUserById(userType, user._id, { isActive });

    return;
  }
}
