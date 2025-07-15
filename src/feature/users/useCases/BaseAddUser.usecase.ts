import { injectable, unmanaged } from "inversify/lib/inversify";
import { defaultAvatarUrl } from "../../../config";
import { TEndUserWithoutMasterEnums } from "../../../constants/globalEnums";
import { EventDispatcher } from "../../../core/domainEvents/EventDispatcher";
import { FileDetails, FileManager, FileUploadPayload } from "../../../core/fileManager/FileManager";
import { HashingHelper } from "../../../helpers/HashUtils";
import { BaseEntity, ID } from "../../../types/BaseEntity";
import { UserPostFeedRepo } from "../../announcements/repos/UserPostFeed.repo";
import { RoleRepo } from "../../authorization/domain/Role.repo";
import { NotificationSettingsService } from "../../notifications/NotificationSettings.service";
import { School } from "../../schools/domain/school.entity";
import { BaseUser, TGenderEnum } from "../domain/baseUser.entity";
import { CentralUserRepo } from "../domain/CentralUser.repo";
import { NewUserAddedEvent } from "../domain/NewUserAdded.event";
import { UserService } from "../domain/User.service";

export type AddBaseUserRequest = {
  firstName: string;
  lastName: string;
  gender: TGenderEnum;
  password: string;
  avatar: FileUploadPayload | null;
  roles: ID[];
  email?: string;
  phoneNumber?: string;
  address1?: string;
  address2?: string;
  birthDate?: Date;
};

@injectable()
export abstract class BaseAddUserUseCase<
  AddUserRequest extends AddBaseUserRequest,
  User extends BaseUser,
> {
  constructor(
    @unmanaged() private fileManager: FileManager,
    @unmanaged() private userType: TEndUserWithoutMasterEnums,
    @unmanaged() private school: School,
    @unmanaged() private notificationSettingsService: NotificationSettingsService,
    @unmanaged() private centralUserRepo: CentralUserRepo,
    @unmanaged() private userPostFeedRepo: UserPostFeedRepo,
    @unmanaged() protected roleRepo: RoleRepo,
    @unmanaged() private eventDispatcher: EventDispatcher,
  ) {}

  async execute(userDetails: AddUserRequest): Promise<User> {
    await this.preAddUser(userDetails);

    const user = await this.addUser(userDetails);

    await this.postAddUser(user, userDetails);

    return user;
  }

  protected async addUser(userDetails: AddUserRequest): Promise<User> {
    if (userDetails.email)
      await this.centralUserRepo.ensureEmailUniquenessOnAdd(userDetails.email, this.userType);

    if (userDetails.phoneNumber)
      await this.centralUserRepo.ensurePhoneUniquenessOnAdd(userDetails.phoneNumber, this.userType);

    let avatar: FileDetails | null = null;
    if (userDetails.avatar)
      avatar = await this.fileManager.uploadFile(userDetails.avatar, "users/avatar");

    const fullName = UserService.generateFullName(userDetails.firstName, userDetails.lastName);

    const hashedPassword = await HashingHelper.generateHash(userDetails.password);

    const baseUserPayload: Omit<BaseUser, keyof BaseEntity> = {
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      gender: userDetails.gender,
      fullName,
      avatar: avatar || {
        link: defaultAvatarUrl,
        uploadedAt: new Date(),
        name: defaultAvatarUrl,
        path: defaultAvatarUrl,
        size: 660,
        mimeType: "svg",
      },
      password: hashedPassword,
      passwordChangedAt: null,
      email: userDetails.email || null,
      phoneNumber: userDetails.phoneNumber || null,
      address1: userDetails.address1 || null,
      address2: userDetails.address2 || null,
      birthDate: userDetails.birthDate || null,
      roles: userDetails.roles,
      isArchived: false,
      archivedAt: null,
      isActive: true,
    };

    const user = await this.addUserToDB(userDetails, baseUserPayload);

    await this.centralUserRepo.addOne(
      {
        tenantId: this.school._id,
        newId: `${this.school.newId}.${user.newId}`,
        userId: user._id,
        email: userDetails.email || undefined,
        phoneNumber: userDetails.phoneNumber || undefined,
      },
      this.userType,
    );

    await this.notificationSettingsService.addNotificationSettings(user._id);

    await this.userPostFeedRepo.addOne({
      user: user._id,
      userType: this.userType,
      posts: [],
      unseenPosts: [],
    });

    const newUserAddedEvent = new NewUserAddedEvent({
      user,
      password: userDetails.password,
      userType: this.userType,
      schoolSubdomain: this.school.subdomain,
    });
    void this.eventDispatcher.dispatchEvent(newUserAddedEvent);

    return user;
  }

  protected abstract addUserToDB(
    userDetails: AddUserRequest,
    baseUser: Omit<BaseUser, keyof BaseEntity>,
  ): Promise<User>;

  protected abstract preAddUser(userDetails: AddUserRequest): Promise<void>;

  protected abstract postAddUser(user: User, userDetails: AddUserRequest): Promise<void>;
}
