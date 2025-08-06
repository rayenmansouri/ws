import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { MasterRepo } from "../../masters/domain/Master.repo";
import { BadRequestError, NotFoundError } from "../../../core/ApplicationErrors";
import { AuthenticationHelper } from "../../../core/auth.helper";
import { UserProfileDTO } from "../../users/dtos/userProfile.dto";
import { UserMapper } from "../../users/mappers/User.mapper";

type LoginByMasterRequest = {
  email: string;
  password: string;
};

@injectable()
export class LoginByMasterUseCase {
  constructor(@inject("MasterRepo") private masterRepo: MasterRepo) {}

  async execute(data: LoginByMasterRequest): Promise<{ token: string; user: UserProfileDTO }> {
    const { email, password } = data;

    const master = await this.masterRepo.findOneByEmail(email);
    if (!master) throw new NotFoundError("notFound.master");

    const isPasswordValid = await AuthenticationHelper.checkStringHashMatch(
      password,
      master.password,
    );
    if (!isPasswordValid) throw new BadRequestError("authentication.invalidCredentials");

    const token = AuthenticationHelper.generateMasterToken(master._id);

    const user = UserMapper.toUserProfileDTO(master);

    return { token, user };
  }
}
