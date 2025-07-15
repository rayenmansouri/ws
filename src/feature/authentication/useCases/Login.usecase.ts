import { injectable } from "inversify/lib/inversify";
import { TEndUserEnum } from "../../../constants/globalEnums";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { AuthenticationHelper } from "../../../core/auth.helper";
import { inject } from "../../../core/container/TypedContainer";
import { CentralUser } from "../../users/domain/centralUser.entity";
import { UsersRepo } from "../../users/domain/user.repo";
import { UserProfileDTO } from "../../users/dtos/userProfile.dto";
import { UserMapper } from "../../users/mappers/User.mapper";

type LoginUseCaseInput = {
  user: CentralUser;
  password: string;
  userType: TEndUserEnum;
};

@injectable()
export class LoginUseCase {
  constructor(@inject("UsersRepo") private userRepo: UsersRepo) {}

  async execute(
    data: LoginUseCaseInput,
  ): Promise<
    | { token: string; user: UserProfileDTO; isActive: true }
    | { token: null; user: null; isActive: false }
  > {
    const { user, password, userType } = data;

    const userFromDb = await this.userRepo.findUserByIdOrThrow(userType, user.userId);

    const isPasswordValid = await AuthenticationHelper.checkStringHashMatch(
      password,
      userFromDb.password,
    );

    if (!isPasswordValid) throw new BadRequestError("validation.invalidPassword");

    if (!userFromDb.isActive) return { token: null, user: null, isActive: false };

    const token = AuthenticationHelper.generateUserToken(userFromDb._id, user.tenantId);

    return { token, user: UserMapper.toUserProfileDTO(userFromDb), isActive: true };
  }
}
