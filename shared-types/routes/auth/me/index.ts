import { ReplaceDatesWithStrings } from "../../../utils";
import { MeResponse } from "../../../../src/api-v2/auth/me/me.types";
import { MeRouteConfig } from "../../../../src/api-v2/auth/me/me.types";

export const meRoute = {
    path: "/me" as const,
    method: "get" as const,
    paramsKey: [] as const,
};

export type MeRouteType = {
  path: "/me";
  method: "get";
  paramsKey: readonly string[];
  body?: ReplaceDatesWithStrings<MeRouteConfig['body']>;
  params?: ReplaceDatesWithStrings<MeRouteConfig['params']>;
  query?: ReplaceDatesWithStrings<MeRouteConfig['query']>;
  files?: ReplaceDatesWithStrings<MeRouteConfig['files']>;
  response: {
    status: string;
    message: string;
    data: ReplaceDatesWithStrings<MeResponse>;
  };
}

export type MeRouteTypeAdmin = MeRouteType & {
    response: {
        status: string;
        message: string;
        data: ReplaceDatesWithStrings<MeResponse>;
    };
}

export type MeRouteTypeMaster = MeRouteType & {
    response: {
        status: string;
        message: string;
        data: ReplaceDatesWithStrings<MeResponse>;
    };
}

export type MeRouteTypeParticipant = MeRouteType & {
    response: {
        status: string;
        message: string;
        data: ReplaceDatesWithStrings<MeResponse>;
    };
}

export type MeRouteTypeCoach = MeRouteType & {
    response: {
        status: string;
        message: string;
        data: ReplaceDatesWithStrings<MeResponse>;
    };
}
