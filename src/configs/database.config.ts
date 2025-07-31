export const masterDabaseUri = `mongodb+srv://rayenmansouri:VsV35mzJ3UZdpkSk@cluster0.jgxndvk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=master`;
export const getDatabaseUri = (tenantId: string) => {
    return `mongodb+srv://rayenmansouri:VsV35mzJ3UZdpkSk@cluster0.jgxndvk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=${tenantId}`;
};
