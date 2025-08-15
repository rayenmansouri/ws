import { injectable } from "inversify";
import { TEndUserEnum } from "../../../constants/globalEnums";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { AuthenticationHelper } from "../../../core/auth.helper";
import { inject } from "../../../core/container/TypedContainer";
import { School } from "../../schools/domain/school.entity";
import { UsersRepo } from "../../users/domain/user.repo";
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
    @inject("UsersRepo") private userRepo: UsersRepo,
    @inject("School") private school: School,
    @inject("UsersRepo") private usersRepo: UsersRepo,
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
