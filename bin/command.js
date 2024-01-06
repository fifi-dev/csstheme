#!/usr/bin/env node
import fs from "fs"
import {findFile} from "./findFile.js";
import {generateVariable, generateThemeVariables} from "./generateVariable.js";
import {updateConfig, useConfig, readConfigFile} from "./useConfig.js"
import {choiceTheme} from "./choiceTheme.js";
import readlineSync from "readline-sync";
import themesLists from "../lib/themes.js"

// Search if files exist
let variablesCSSPath = findFile("cssTheme.css");
const configFilePath = findFile("cssTheme.config.js");

if (!variablesCSSPath) {
    // Create cssTheme.css at the base of the project
    fs.writeFileSync("cssTheme.css", "");
    // Update variablesCSSPath
    variablesCSSPath = findFile("cssTheme.css");
}

let selectedThemeName;
let theme;
let valuesToGenerate;

if (!configFilePath) {
    // Choice theme
    selectedThemeName = choiceTheme();
    theme = themesLists[selectedThemeName];
    // Create config file
    useConfig(selectedThemeName);
    // Generate theme variable
    valuesToGenerate = generateThemeVariables(selectedThemeName, theme, undefined);
} else {
    const config = await readConfigFile(configFilePath);

    // If custom theme is set
    if (config.theme) {
        // Know if we change the theme or keep the same one
        const changeTheme = readlineSync.keyInYNStrict(`Your theme is ${config.theme}. Do you want to change it?`);
        selectedThemeName = changeTheme ? choiceTheme() : config.theme;
        theme = themesLists[selectedThemeName];

        // If theme doesn't exist
        if (theme === undefined) {
            console.error("Theme doesn't exist");
            process.exit(0);
        }
    } else {
        // Choice theme
        selectedThemeName = choiceTheme();
        theme = themesLists[selectedThemeName];
    }
    // Updating the config file
    updateConfig(selectedThemeName, configFilePath);
    // Generate theme and custom variables
    valuesToGenerate = generateThemeVariables(selectedThemeName, theme, config.customVariable);
}

// Delete content from the css variable file before writing new variables
fs.writeFileSync(variablesCSSPath, '');

// Generation of theme variables and custom ones
fs.writeFileSync(variablesCSSPath, generateVariable(valuesToGenerate));

console.log(`Your theme ${selectedThemeName} is ready`);
