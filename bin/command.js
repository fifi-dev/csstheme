#!/usr/bin/env node
import fs from "fs"
import path from "path"
import themesLists from "../lib/themes.js"

// Get theme name
if(process.argv.length !== 3){
    console.error("USAGE : npm run theme <themeName>")
    process.exit(0)
}
const themeName = process.argv[2]


// Find theme
const theme = themesLists[themeName]
if(!theme){
    console.error("Theme not found")
    process.exit(0)
}

// Function to recursively search for a file in a directory
const findFileInDirectory = (directory, fileName) => {
    const files = fs.readdirSync(directory);

    for (const file of files) {
        const filePath = path.join(directory, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            const result = findFileInDirectory(filePath, fileName);
            if (result) {
                return result;
            }
        } else if (file === fileName) {
            return filePath;
        }
    }

    return null;
};

// Function to find variables.css in the project
export const findVariablesCSS = () => {
    // Assuming this script is in the root of your project
    const projectRoot = process.cwd();
    return findFileInDirectory(projectRoot, "variables.css");
};

const variablesCSSPath = findVariablesCSS();

// Generate variables
const generateCSS = (variables) => {
    let cssString = ':root {\n';

    for (const [name, value] of Object.entries(variables)) {
        cssString += `  --${name}: ${value};\n`;
    }

    cssString += '}\n';
    return cssString;
};

if (variablesCSSPath) {
    fs.writeFileSync("variables.css", generateCSS(theme.colors));
} else {
    console.error("variables.css not found in the project. Please create it.");
}
