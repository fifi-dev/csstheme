#!/usr/bin/env node
import fs from "fs"
import {findFile} from "./findFile.js";
import {generateVariable} from "./generateVariable.js";
import {updateConfig, generateConfig} from "./generateConfig.js"
import themesLists from "../lib/themes.js"
import readlineSync from "readline-sync";
import {generateCSSVariables, readConfigFile} from "./generateCustomVariable.js";

// List all available theme names
const availableThemes = Object.keys(themesLists);
console.log("Available themes:", availableThemes.join(", "));

// Allow user to select a theme interactively
const themeName = readlineSync.keyInSelect(availableThemes, "Select a theme:", {cancel: false});

if (themeName === -1) {
    console.error("Theme selection canceled. Exiting.");
    process.exit(0);
}

const selectedThemeName = availableThemes[themeName];
const theme = themesLists[selectedThemeName];

// Search if file variables exist
const variablesCSSPath = findFile("cssTheme.css");
const configFilePath = findFile("cssTheme.config.js");

if (variablesCSSPath) {
    // Delete content of variables.css before writing new variables
    fs.writeFileSync(variablesCSSPath, '');
    const personalizeValues = readConfigFile(configFilePath);
    const test = generateCSSVariables(personalizeValues);
    fs.writeFileSync(variablesCSSPath, generateVariable(theme, selectedThemeName, test));
    configFilePath ? updateConfig(selectedThemeName, configFilePath) : generateConfig(selectedThemeName);
} else {
    console.error("cssTheme.css not found in the project. Please create it.");
}

// TEST
