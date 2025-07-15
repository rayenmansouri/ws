import { injectable } from "inversify/lib/inversify";
import { FileManager, FileUploadPayload } from "../../../core/fileManager/FileManager";
import { TEndUserEnum } from "../../../constants/globalEnums";
import { inject } from "../../../core/container/TypedContainer";
import { UsersRepo } from "../domain/user.repo";
import { ID } from "../../../types/BaseEntity";
import { defaultAvatarUrl } from "../../../config";

type TUploadAvatarRequest = {
  file: FileUploadPayload;
  userId: ID;
  userType: TEndUserEnum;
};

@injectable()
export class UploadAvatarUseCase {
  constructor(
    @inject("UsersRepo") private usersRepo: UsersRepo,
    @inject("FileManager") private fileManager: FileManager,
  ) {}

  async execute(data: TUploadAvatarRequest): Promise<void> {
    const user = await this.usersRepo.findUserByIdOrThrow(data.userType, data.userId);

    if (user.avatar.link && user.avatar.link != defaultAvatarUrl) {
      await this.fileManager.deleteFiles([user.avatar.link]);
    }

    const avatarFile = await this.fileManager.uploadFile(
      data.file,
      `${data.userType}/avatars/${data.userId}`,
    );

    await this.usersRepo.updateAvatar(data.userType, data.userId, avatarFile);
    return;
  }
}
