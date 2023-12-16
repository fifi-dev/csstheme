import fs from "fs";
import path from "path";

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

// Modifier le fichier de config
export const updateConfig = async (themeName, configFilePath) => {
    try {
        // Importer le fichier de configuration en tant que module
        const modulePath = path.resolve(configFilePath);
        const cssThemeModule = await import(modulePath);

        // Mettre à jour le thème
        cssThemeModule.default.theme = themeName;

        // Convertir l'objet en chaîne JSON et réparer les guillemets
        const updatedConfig = `const cssThemeConfig = ${JSON.stringify(cssThemeModule.default, null, 2).replace(/"([^"]+)":/g, '$1:')};\n\nexport default cssThemeConfig;\n`;

        // Écrire le fichier mis à jour
        fs.writeFileSync(configFilePath, updatedConfig, 'utf-8');

        console.log(`Le thème a été mis à jour avec "${themeName}"`);
    } catch (err) {
        console.error(`Erreur lors de la mise à jour du thème : ${err.message}`);
    }
}
