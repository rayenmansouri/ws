export type ListOptions = {
  limit: number | undefined;
  page: number | undefined;
};

export type OnlyOne<T> = {
  [K in keyof T]: {
    [P in keyof T]: P extends K ? T[P] : undefined;
  };
}[keyof T];
