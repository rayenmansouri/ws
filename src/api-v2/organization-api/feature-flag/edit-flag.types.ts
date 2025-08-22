import { ReplaceDatesWithStrings } from "../../../../shared-types/utils";
import { editFlagParamsValidation, EditFlagValidation } from "./edit-flag.validation";
import { TypedRequestOptions } from "../../../core/express/types";
import { z } from "zod";
import { Organization } from "../../../feature/organization-magement/domain/organization.entity";

export type EditFeatureFlagRouteType = TypedRequestOptions & {
    params: z.infer<typeof editFlagParamsValidation>,
    body: EditFlagValidation;
    query: never;
    files: never;
    response: {
        status: string;
        message: string;
        data: ReplaceDatesWithStrings<EditFlagValidation>;
    }
}

export type EditFeatureFlagResponse = {
    organization: Organization | null;
}