import dotenv from "dotenv";

dotenv.config();

export const masterDabaseUri = `${process.env.MONGODB_URI}&dbName=master`;
export const getDatabaseUri = (tenantId: string) => {
    return `${process.env.MONGODB_URI}&dbName=${tenantId}`;
};
