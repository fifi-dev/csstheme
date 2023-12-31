import fs from "fs";
import path from "path";

const packagePath = path.resolve(process.cwd(), "package.json");

// Check if packagePath points to a directory
const stats = fs.statSync(packagePath);
if (stats.isDirectory()) {
    console.error(`The path ${packagePath} points to a directory instead of a file.`);
    process.exit(1);
}

const customScripts = { cssTheme: "cssTheme" };

const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf-8"));
packageJson.scripts = { ...packageJson.scripts, ...customScripts };

fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
