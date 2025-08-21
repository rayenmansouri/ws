import { ReplaceDatesWithStrings } from "../../../utils";
import { GetAllOrganizationsResponse } from "../../../../src/api-v2/organization-api/get-all-organizations/get-all-organizations.types";

export const getAllOrganizationsRoute = {
    path: "/organizations" as const,
    method: "get" as const,
    paramsKey: [],
};

export type getAllOrganizationsRouteType = {
    path: string;
    method: string;
    paramsKey: string[];
};

export type getAllOrganizationsRouteTypeAdmin = getAllOrganizationsRouteType & {
    response: {
        status: string;
        message: string;
        data: ReplaceDatesWithStrings<GetAllOrganizationsResponse>;
    };
}