import { ListLevelsValidation } from "./listLevels.validation";

export type ListLevelsRouteConfig = {
  body: null;
  params: null;
  query: ListLevelsValidation;
  files: never;
};

export type ListLevelsResponse = {
  data: Array<{
    _id: string & { _isID: true };
    name: string;
    newId: string;
    color: string;
    rank: number;
  }>;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
