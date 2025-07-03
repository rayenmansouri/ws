import { TActionsEnum, TResourcesEnum } from "../../constants/ActionsResource";
import { TEndUserEnum } from "../../constants/globalEnums";
import { OmitFromEnum, PickFromEnum } from "../../types/utils/enums.util";
import { registerRoute } from "./registerRoute";
import { RouteConfiguration, TPlatformEnum, TypedRequestOptions } from "./types";

type UserPlatformPairs = (
  | {
      endUser: PickFromEnum<TEndUserEnum, "admin" | "teacher">;
      platforms: TPlatformEnum[];
      authorization?: {
        action: TActionsEnum;
        resource: TResourcesEnum;
      };
    }
  | {
      endUser: OmitFromEnum<TEndUserEnum, "admin" | "teacher">;
      platforms: TPlatformEnum[];
      authorization?: never;
    }
)[];

export const registerSharedRoute =
  <Options extends TypedRequestOptions>() =>
  <Path extends string>(
    routeConfig: Omit<RouteConfiguration<Options, Path>, "endUser" | "platform" | "authorization">,
    userPlatformPairs: UserPlatformPairs,
  ): void => {
    userPlatformPairs.forEach(userAndPlatform => {
      userAndPlatform.platforms.forEach(platform => {
        registerRoute<Options>()({
          ...routeConfig,
          endUser: userAndPlatform.endUser,
          platform,
          authorization: userAndPlatform.authorization,
        } as unknown as RouteConfiguration<Options, Path>);
      });
    });
  };
