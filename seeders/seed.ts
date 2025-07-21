import { connectToMasterDatabase } from "../src/database/connectionDB/masterDBConnection";
import fs from "fs";
import path from "path";
import { ISeeder } from "./interface";


async function loadSeedClass(filePath: string){
    const seedsDir = path.join(__dirname, "./seeds");
    const fullPath = path.join(seedsDir, filePath);
    const imported: unknown = await import(fullPath);
    if (
        imported &&
        typeof imported === "object" &&
        "default" in imported &&
        typeof (imported as { default: unknown }).default === "function"
      ) {
        const SeedClass = (imported as { default: new () => ISeeder }).default;
        return new SeedClass();
      }
      throw new Error(`No default export found in ${filePath}`);
}

async function seedOne(filePath: string){
    const SeedClass = await loadSeedClass(filePath);
    await SeedClass.preSeed();
    await SeedClass.seed();
}

async function seedAll(){
    const seedsDir = path.join(__dirname, "./seeds");
    const files = fs.readdirSync(seedsDir)
        .filter((file) => file.endsWith(".ts") || file.endsWith(".js"))
        .sort((a, b) => {
            const timestampA = parseInt(a.replace(/.*(\d+)\.ts$/, "$1"));
            const timestampB = parseInt(b.replace(/.*(\d+)\.ts$/, "$1"));
            return timestampA - timestampB;
        });
    for (const file of files) {
     await seedOne(file);
    }
}



connectToMasterDatabase().then(async () => {
    await seedAll();
    process.exit(0);
}).catch(console.error);