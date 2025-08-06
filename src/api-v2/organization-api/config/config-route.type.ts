import { z } from "zod";
import { OrganizationSystemType } from "../../../feature/organization-magement/enums";

export const configParamValidation = z.object({
    organizationId: z.string(),
});

export type getConfigResponse = {
    organizationSystemType: OrganizationSystemType
    ;
};

export type getConfigParamValidation = z.infer<typeof configParamValidation>;

export type getConfigRouteType = {
    body:null;
    params:getConfigParamValidation;
    query:never;
    files:never;
};





