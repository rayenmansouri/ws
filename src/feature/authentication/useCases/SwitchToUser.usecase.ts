import { injectable } from "inversify";
import { TEndUserEnum } from "../../../constants/globalEnums";
import { AuthenticationHelper } from "../../../core/auth.helper";
import { inject } from "../../../core/container/TypedContainer";
import { ID } from "../../../types/BaseEntity";
import { School } from "../../schools/domain/school.entity";
import { UsersRepo } from "../../users/domain/user.repo";

@injectable()
export class SwitchToUserUseCase {
  constructor(
    @inject("UsersRepo") private usersRepo: UsersRepo,
    @inject("School") private school: School,
  ) {}

  async execute(userType: TEndUserEnum, userId: ID): Promise<string> {
    const userDoc = await this.usersRepo.findUserByIdOrThrow(userType, userId);

    const token = AuthenticationHelper.generateSwitchUserToken(userDoc._id, this.school._id);

    return token;
  }
}
