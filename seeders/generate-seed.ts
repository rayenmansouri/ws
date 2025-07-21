import fs from "fs";
import path from "path";

export function generateSeed(name: string){
    const timestamp = Date.now();
    const className =
    name.charAt(0).toUpperCase() + name.slice(1) + "Seed";
    const fileName = `${name.toLowerCase()}-${timestamp}.ts`;
    const seedsDir = path.join(__dirname, "seeds");
    if (!fs.existsSync(seedsDir)) {
        fs.mkdirSync(seedsDir);
    }
    const filePath = path.join(seedsDir, fileName);
    const content = `import { ISeeder } from "../interface";

export default class ${className} implements ISeeder {
    async seed(): Promise<void> {
        console.log("seeding ${name}");
    }
    async preSeed(): Promise<void> {
        console.log("removing all ${name} from database");
    }
}
`;
    fs.writeFileSync(filePath, content, { encoding: "utf8" });
    console.log(`Seed file created: ${filePath}`);
}

if (require.main === module) {
    const name = process.argv[2];
    if (!name) {
        console.error("Usage: ts-node generate-seed.ts <SeedName>");
        process.exit(1);
    }
    generateSeed(name);
}

    