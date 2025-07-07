import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { AppVersionRepo } from "../domain/AppVersion.repo";
import { TAppPlatformEnum } from "../domain/AppVersion.entity";

@injectable()
export class UpdateAppVersionUseCase {
  constructor(@inject("AppVersionRepo") private appVersionRepo: AppVersionRepo) {}

  async execute(payload: Partial<Record<TAppPlatformEnum, string>>): Promise<void> {
    await this.appVersionRepo.updateVersions(payload);
  }
}
