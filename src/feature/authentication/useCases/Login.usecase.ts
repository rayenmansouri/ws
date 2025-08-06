import { injectable } from "inversify/lib/inversify";
import { TEndUserEnum } from "../../../constants/globalEnums";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { AuthenticationHelper } from "../../../core/auth.helper";
import { inject } from "../../../core/container/TypedContainer";
import { Organization } from "../../organization-magement/domain/organization.entity";
import { UserRepository } from "../../user-management/base-user/domain/base-user.repository";
import { UserProfileDTO } from "../../users/dtos/userProfile.dto";
import { UserMapper } from "../../users/mappers/User.mapper";

type LoginUseCaseInput = {
  password: string;
  userType: TEndUserEnum;
  credential: string;
};

@injectable()
export class LoginUseCase {
  constructor(
    @inject("UserRepository") private userRepo: UserRepository,
    @inject("Organization") private school: Organization,
    @inject("UserRepository") private usersRepo: UserRepository,
  ) {}

  async execute(
    data: LoginUseCaseInput,
  ): Promise<
    | { token: string; user: UserProfileDTO; isActive: true }
    | { token: null; user: null; isActive: false }
  > {
    const { credential, password, userType } = data;
    const user = await this.usersRepo.findByIdentifierOrThrow(credential, userType);

    const isPasswordValid = await AuthenticationHelper.checkStringHashMatch(
      password,
      user.password,
    );

    if (!isPasswordValid) throw new BadRequestError("validation.invalidPassword");

    if (!user.isActive) return { token: null, user: null, isActive: false };

    const token = AuthenticationHelper.generateUserToken(user._id, this.school._id);

    return { token, user: UserMapper.toUserProfileDTO(user), isActive: true };
  }
}
