import fs from "fs";

// Fonction pour générer le fichier de configuration
export const generateConfig = (themeName) => {
    const cssThemeConfig = {
        theme: themeName,
        personalize: {
            colors: {},
            spacing: {},
        }
    };

    const configFileContent = `const cssThemeConfig = ${JSON.stringify(cssThemeConfig, null, 2).replace(/"([^"]+)":/g, '$1:')};\n\nexport default cssThemeConfig;\n`;
    fs.writeFileSync('./cssTheme.config.js', configFileContent, 'utf-8');
};
