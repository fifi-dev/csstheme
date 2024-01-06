#!/usr/bin/env node
import fs from "fs"
import {findFile} from "./findFile.js";
import {generateVariable} from "./generateVariable.js";
import {updateConfig, useConfig, readConfigFile} from "./useConfig.js"
import themesLists from "../lib/themes.js"
import readlineSync from "readline-sync";

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

// Search if files exist
const variablesCSSPath = findFile("cssTheme.css");
const configFilePath = findFile("cssTheme.config.js");

// Values to generate in the variablesCSSPath
const valuesToGenerate = [
    {
        values : theme,
        comment : `/* Theme: ${selectedThemeName} */\n`
    }
]

let customVariable;

if (variablesCSSPath) {
    // Delete content from the css variable file before writing new variables
    fs.writeFileSync(variablesCSSPath, '');

    // Configuring the config.js file
    if(configFilePath){
        updateConfig(selectedThemeName, configFilePath);
        customVariable = await readConfigFile(configFilePath);
        valuesToGenerate.push({
            values : customVariable,
            comment : `\n/* Custom variables */\n`
        })
    }else{
        useConfig(selectedThemeName)
    }

    // Generation of theme variables and custom ones
    fs.writeFileSync(variablesCSSPath, generateVariable(valuesToGenerate));
} else {
    console.error("cssTheme.css not found in the project. Please create it.");
}
