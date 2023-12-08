#!/usr/bin/env node
import fs from "fs"
import {findFile} from "./findFile.js";
import {generateVariable} from "./generateVariable.js";
import themesLists from "../lib/themes.js"
import readlineSync from "readline-sync";

// List all available theme names
const availableThemes = Object.keys(themesLists);
console.log("Available themes:", availableThemes.join(", "));

// Allow user to select a theme interactively
const themeName = readlineSync.keyInSelect(availableThemes, "Select a theme:", { cancel: false });

if (themeName === -1) {
    console.error("Theme selection canceled. Exiting.");
    process.exit(0);
}

const selectedThemeName = availableThemes[themeName];
const theme = themesLists[selectedThemeName];

const variablesCSSPath = findFile();


if (variablesCSSPath) {
    // Delete content of variables.css before writing new variables
    fs.writeFileSync(variablesCSSPath, '');
    fs.writeFileSync(variablesCSSPath, generateVariable(theme));
} else {
    console.error("variables.css not found in the project. Please create it.");
}
