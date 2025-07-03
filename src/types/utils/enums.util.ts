export type PickFromEnum<U, M extends U> = U extends M ? U : never;

export type OmitFromEnum<U, M extends U> = U extends M ? never : U;
