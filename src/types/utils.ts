export type StrictOmit<T, U extends keyof T> = {
  [K in keyof T]: K extends U ? undefined : T[K];
};

export type RemoveUndefined<T> = T extends undefined ? never : T;

export type RemoveNull<T> = T extends null ? never : T;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructor<T> = new (...args: any[]) => T;
