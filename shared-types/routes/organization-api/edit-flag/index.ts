import { EditFlagParamsValidation,EditFlagValidation } from '../../../../src/api-v2/organization-api/feature-flag/edit-flag.validation';
import { ReplaceDatesWithStrings } from '../../../utils';

export * from '../../../../src/api-v2/organization-api/feature-flag/edit-flag.types';

export const editFlagRoute = {
    path: "/organizations/:id/feature-flags" as const,
    method: "put" as const,
    paramsKey: [],
};

export type EditFlagRouteType = {
    path: "/organizations/:id/feature-flags";
    method: "put";
    paramsKey: readonly string[];
    body: ReplaceDatesWithStrings<EditFlagValidation>;
    params: ReplaceDatesWithStrings<EditFlagParamsValidation>;
    response: {
        status: string;
        message: string;
        data: ReplaceDatesWithStrings<EditFlagValidation>;
    }
}