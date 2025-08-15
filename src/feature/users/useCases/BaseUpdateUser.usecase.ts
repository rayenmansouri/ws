import { injectable, unmanaged } from "inversify";
import { TEndUserWithoutMasterEnums } from "../../../constants/globalEnums";
import { FileDetails, FileManager, FileUploadPayload } from "../../../core/fileManager/FileManager";
import { ID } from "../../../types/BaseEntity";
import { School } from "../../schools/domain/school.entity";
import { BaseUser, TGenderEnum } from "../domain/baseUser.entity";
import { UserService } from "../domain/User.service";

export type UpdateBaseUserRequest = {
  firstName?: string;
  lastName?: string;
  gender?: TGenderEnum;
  avatar?: FileUploadPayload | null;
  roles?: ID[];
  email?: string | null;
  phoneNumber?: string | null;
  address1?: string | null;
  address2?: string | null;
  birthDate?: Date | null;
};

@injectable()
export abstract class BaseUpdateUserUseCase<
  UpdateUserRequest extends UpdateBaseUserRequest,
  User extends BaseUser,
> {
  constructor(
    @unmanaged() private fileManager: FileManager,
    @unmanaged() private userType: TEndUserWithoutMasterEnums,
    @unmanaged() private school: School,
  ) {}

  async execute(newId: string, userDetails: UpdateUserRequest): Promise<void> {
    const user = await this.findUserByNewId(newId);

    await this.preUpdateUser(user, userDetails);

    const updatedUser = await this.updateUser(user, userDetails);

    await this.postUpdateUser(updatedUser, userDetails);
  }

  protected async updateUser(user: User, userDetails: UpdateUserRequest): Promise<User> {
    let avatar: FileDetails | undefined;
    if (userDetails.avatar)
      avatar = await this.fileManager.uploadFile(userDetails.avatar, "users/avatar");

    let fullName: string | undefined;
    if (userDetails.firstName || userDetails.lastName)
      fullName = UserService.generateFullName(
        userDetails.firstName || user.firstName,
        userDetails.lastName || user.lastName,
      );

    const updatePayload: Partial<BaseUser> = {
      ...userDetails,
      avatar: avatar,
      fullName,
    };

    const updatedUser = await this.updateUserInDB(user, updatePayload);

    return updatedUser;
  }

  protected abstract findUserByNewId(newId: string): Promise<User>;

  protected abstract updateUserInDB(user: User, updatePayload: Partial<BaseUser>): Promise<User>;

  protected abstract preUpdateUser(user: User, userDetails: UpdateUserRequest): Promise<void>;

  protected abstract postUpdateUser(user: User, userDetails: UpdateUserRequest): Promise<void>;
}
