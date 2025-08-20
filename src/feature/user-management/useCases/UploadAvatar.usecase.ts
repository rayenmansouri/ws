import { inject } from "../../../core/container/TypedContainer";
import { FileDetails, FileManager, LocallyUploadedFile } from "../../../core/fileManager/FileManager";
import { UserRepository } from "../base-user/domain/base-user.repository";
import { UserTypeEnum } from "../factory/enums";
import { BASE_USER_REPOSITORY_IDENTIFIER, UPLOAD_AVATAR_USECASE_IDENTIFIER } from "../constants";
import { NotFoundError } from "../../../core/ApplicationErrors";
import { Injectable } from "../../../core/container/decorators/AutoRegister.decorator";
import { backendUri } from "../../../configs/backend-config";

type UploadAvatarRequest = {
  file: LocallyUploadedFile;
  userId: string;
  userType: UserTypeEnum;
};

@Injectable({
  identifier: UPLOAD_AVATAR_USECASE_IDENTIFIER
})
export class UploadAvatarUseCase {
  constructor(
    @inject(BASE_USER_REPOSITORY_IDENTIFIER) private baseUserRepository: UserRepository,
    @inject("FileManager") private fileManager: FileManager,
  ) {}

  async execute(data: UploadAvatarRequest): Promise<FileDetails> {
    const user = await this.baseUserRepository.findOne({ _id: data.userId });
    
    if (!user) {
      throw new NotFoundError("User not found");
    }

    // Delete old avatar if exists
    if (user.avatar?.link) {
      await this.fileManager.deleteFiles([user.avatar.link]);
    }
  
    // Update user avatar in database
    await this.baseUserRepository.updateAvatar(data.userId, {
      name: data.file.name,
      link: `${backendUri}/uploads/${data.file.path}`,
      path: data.file.path,
      uploadedAt: new Date(),
      size: data.file.buffer.length,
      mimeType: data.file.mimetype,
    });

    return {
      name: data.file.name,
      link: `${backendUri}/uploads/${data.file.path}`,
      path: data.file.path,
      uploadedAt: new Date(),
      size: data.file.buffer.length,
      mimeType: data.file.mimetype,
    }
  }
}
