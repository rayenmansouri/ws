import { BadRequestError } from "../../../core/ApplicationErrors";
import { Injectable } from "../../../core/container/decorators/AutoRegister.decorator";
import { inject } from "../../../core/container/TypedContainer";
import { AuthenticationHelper } from "../../../core/auth.helper";
import { BaseUserEntity } from "../../users/domain/baseUser.entity";
import { UserRepository } from "../../user-management/base-user/domain/base-user.repository";
import { BASE_USER_REPOSITORY_IDENTIFIER } from "../../user-management/constants";
import { UPDATE_CURRENT_USER_PASSWORD_USE_CASE_IDENTIFIER } from "./constants";

export type UpdateCurrentUserPasswordUseCaseRequest = {
  user: Pick<BaseUserEntity, "id" | "password" | "schoolSubdomain">;
  currentPassword: string;
  newPassword: string;
};

@Injectable({
  identifier: UPDATE_CURRENT_USER_PASSWORD_USE_CASE_IDENTIFIER,
})
export class UpdateCurrentUserPasswordUseCase {
  constructor(
    @inject(BASE_USER_REPOSITORY_IDENTIFIER) private userRepo: UserRepository,
  ) {}

  async execute(request: UpdateCurrentUserPasswordUseCaseRequest): Promise<{ token: string }> {
    const { user, currentPassword, newPassword } = request;

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
    const updated = await this.userRepo.updateOne({ _id: user.id }, {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    });

    if (!updated) throw new BadRequestError("validation.failedToUpdatePassword");
    const token = AuthenticationHelper.generateUserToken(user.id, user.schoolSubdomain);

    return { token };
  }
}
