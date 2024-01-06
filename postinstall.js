import fs from "fs";

const packagePath = process.cwd().replace("node_modules/@pfe-css-theme/css-theme", "package.json");
const customScripts = { cssTheme: "cssTheme" };

const packageJson = JSON.parse(await fs.readFileSync(packagePath, "utf-8"));
packageJson.scripts = { ...packageJson.scripts, ...customScripts };

await fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
