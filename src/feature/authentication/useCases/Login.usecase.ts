import { injectable } from "inversify/lib/inversify";
import { TEndUserEnum } from "../../../constants/globalEnums";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { AuthenticationHelper } from "../../../core/auth.helper";
import { inject } from "../../../core/container/TypedContainer";
import { Organization } from "../../organization-magement/domain/organization.entity";
import { UserRepository } from "../../user-management/base-user/domain/base-user.repository";
// Commented out - these modules were deleted during refactoring
// import { UserProfileDTO } from "../../users/dtos/userProfile.dto";
// import { UserMapper } from "../../users/mappers/User.mapper";

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
    | { token: string; user: any; isActive: true }
    | { token: null; user: null; isActive: false }
  > {
    const { credential, password, userType } = data;
    
    // Simplified login logic - full user management was deleted during refactoring
    // TODO: Implement proper user lookup once user management is restored
    const user = {
      _id: "temp-user-id",
      email: credential,
      password: "$2b$10$dummy.hash", // This should come from proper user lookup
      isActive: true,
      firstName: "User",
      lastName: "Name",
      type: userType
    };

    const isPasswordValid = await AuthenticationHelper.checkStringHashMatch(
      password,
      user.password,
    );

    if (!isPasswordValid) throw new BadRequestError("validation.invalidPassword");

    if (!user.isActive) return { token: null, user: null, isActive: false };

    const token = AuthenticationHelper.generateUserToken(user._id, this.school.id);

    return { token, user: { id: user._id, email: user.email, type: userType }, isActive: true };
  }
}
