import fs from "fs";
import path from "path";

// Generating the config file
export const useConfig = (themeName) => {
    const cssThemeConfig = {
        theme: themeName,
        customVariable: {
            colors: {},
            spacing: {},
        }
    };

    const configFileContent = `const cssThemeConfig = ${JSON.stringify(cssThemeConfig, null, 2).replace(/"([^"]+)":/g, '$1:')};\n\nexport default cssThemeConfig;\n`;
    fs.writeFileSync('./cssTheme.config.js', configFileContent, 'utf-8');
};

// Modifying the config file
export const updateConfig = async (themeName, configFilePath) => {
    try {
        // Import configuration file as module
        const modulePath = path.resolve(configFilePath);
        const cssThemeModule = await import(modulePath);

        // Update theme
        cssThemeModule.default.theme = themeName;

        // Convert object to JSON string
        const updatedConfig = `const cssThemeConfig = ${JSON.stringify(cssThemeModule.default, null, 2).replace(/"([^"]+)":/g, '$1:')};\n\nexport default cssThemeConfig;\n`;

        // Write the updated file
        fs.writeFileSync(configFilePath, updatedConfig, 'utf-8');

        console.log(`The theme has been updated with "${themeName}"`);
    } catch (err) {
        console.error(`Error updating theme : ${err.message}`);
    }
}


// Reading the config file
export const readConfigFile = async (configFilePath) => {
    try {
        const modulePath = path.resolve(configFilePath);
        const cssThemeModule = await import(modulePath);

        // Return personalization values
        return cssThemeModule.default.customVariable;
    } catch (err) {
        console.error(`Error reading config file : ${err.message}`);
        return null;
    }
};
