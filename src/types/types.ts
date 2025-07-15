export type ListOptions = {
  limit?: number;
  page?: number;
  skipPagination?: true;
};

export type OnlyOne<T> = {
  [K in keyof T]: {
    [P in keyof T]: P extends K ? T[P] : undefined;
  };
}[keyof T];
