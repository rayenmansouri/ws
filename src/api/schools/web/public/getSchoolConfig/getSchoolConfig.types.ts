import { TInstanceTypeEnum } from "../../../../../feature/schools/domain/school.entity";
import { TFeatureFlagsEnum } from "../../../../../feature/schools/constants/featureFlags";
import { GetSchoolConfigValidation } from "./getSchoolConfig.validation";

export type GetSchoolConfigRouteConfig = GetSchoolConfigValidation & { files: never };
export type GetSchoolConfigResponse = {
  instanceType: TInstanceTypeEnum | null;
  flags: Record<TFeatureFlagsEnum, boolean>;
};
