
export interface ISeeder     {
    preSeed(): Promise<void>;
    seed(): Promise<void>;
}