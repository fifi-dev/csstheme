#!/usr/bin/env node
import fs from "fs"
import {findVariablesCSS} from "./findVariablesCSS.js";
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
    // Delete content of variables.css before writing new variables
    fs.writeFileSync(variablesCSSPath, '');
    fs.writeFileSync(variablesCSSPath, generateCSS(theme.colors));
} else {
    console.error("variables.css not found in the project. Please create it.");
}
