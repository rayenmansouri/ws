import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { AppVersionRepo } from "../domain/AppVersion.repo";
import { AppVersionDto } from "../dtos/appVersion.dto";
import { AppVersionMapper } from "../mappers/AppVersion.mapper";

@injectable()
export class GetAppVersionUseCase {
  constructor(@inject("AppVersionRepo") private appVersionRepo: AppVersionRepo) {}
  async execute(): Promise<AppVersionDto> {
    const [androidVersion, iosVersion] = await Promise.all([
      this.appVersionRepo.findAndroidVersionOrThrow(),
      this.appVersionRepo.findIosVersionOrThrow(),
    ]);

    return AppVersionMapper.toAppVersionDTO({
      android: androidVersion,
      ios: iosVersion,
    });
  }
}
