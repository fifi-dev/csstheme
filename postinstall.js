import fs from "fs";

const packagePath = process.cwd().replace("node_modules/cssTheme", "package.json");
const customScripts = { theme: "theme" };

const packageJson = JSON.parse(await fs.readFileSync(packagePath, "utf-8"));
packageJson.scripts = { ...packageJson.scripts, ...customScripts };

await fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
