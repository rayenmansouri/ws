import { z } from "zod";
import { OrganizationSystemType } from "../../../feature/organization-magement/enums";

export const configParamValidation = z.object({
    organizationId: z.string(),
});

export type getConfigResponse = {
    instanceType: OrganizationSystemType
    flags: {
        messages: boolean;
        announcements: boolean;
        smartCalendar: boolean;
        tutorials: boolean;
        darkMode: boolean;
        lms: boolean;
        library: boolean;
    }
};

export type getConfigParamValidation = z.infer<typeof configParamValidation>;

export type getConfigRouteType = {
    body:null;
    params:getConfigParamValidation;
    query:never;
    files:never;
};





