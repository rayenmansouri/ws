import { injectable } from "inversify";
import { TEndUserEnum } from "../../../constants/globalEnums";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { School } from "../../schools/domain/school.entity";
import { BaseUser } from "../../users/domain/baseUser.entity";
import { UsersRepo } from "../../users/domain/user.repo";
import { AuthenticationHelper } from "../../../core/auth.helper";

export type UpdateCurrentUserPasswordUseCaseRequest = {
  user: Pick<BaseUser, "_id" | "password">;
  userType: TEndUserEnum;
  currentPassword: string;
  newPassword: string;
};

@injectable()
export class UpdateCurrentUserPasswordUseCase {
  constructor(
    @inject("School") private school: School,
    @inject("UsersRepo") private userRepo: UsersRepo,
  ) {}

  async execute(request: UpdateCurrentUserPasswordUseCaseRequest): Promise<{ token: string }> {
    const { user, userType, currentPassword, newPassword } = request;

    if (currentPassword === newPassword) {
      throw new BadRequestError("validation.newPasswordMustNoBeTheSameAsOldPassword");
    }

    const password = user.password;

    const isPasswordValid = await AuthenticationHelper.checkStringHashMatch(
      currentPassword,
      password,
    );

    if (!isPasswordValid) throw new BadRequestError("validation.invalidPassword");

    const newHashedPassword = await AuthenticationHelper.hashString(newPassword);

    await this.userRepo.updateUserById(userType, user._id, {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    });

    const token = AuthenticationHelper.generateUserToken(user._id, this.school._id);

    return { token };
  }
}
