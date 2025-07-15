import { FEATURE_FLAGS_ENUM, TFeatureFlagsEnum } from "../constants/featureFlags";
import { School } from "./school.entity";

export class FeatureFlagService {
  static getSchoolFeatureFlags(school: School): Record<TFeatureFlagsEnum, boolean> {
    const flags = Object.values(FEATURE_FLAGS_ENUM).reduce((acc, flag) => {
      if (school.featureFlags[flag]) acc[flag] = true;
      else acc[flag] = false;
      return acc;
    }, {} as Record<TFeatureFlagsEnum, boolean>);

    return flags;
  }
}
