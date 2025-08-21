import { ReplaceDatesWithStrings } from "../../../utils";
import { GetAllOrganizationsResponse } from "../../../../src/api-v2/organization-api/get-all-organizations/get-all-organizations.types";

export const getAllOrganizationsRoute = {
    path: "/organizations" as const,
    method: "get" as const,
    paramsKey: [] as const,
};

export type getAllOrganizationsRouteType = {
    path: string;
    method: string;
    paramsKey: string[];
};
//get all organizations route type for admin
export type getAllOrganizationsRouteTypeMaster = getAllOrganizationsRouteType & {
    response: {
        status: string;
        message: string;
        data: ReplaceDatesWithStrings<GetAllOrganizationsResponse>;
    };
};