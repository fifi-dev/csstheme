import path from "path";

// Fonction pour lire le contenu de cssTheme.config.js
export const readConfigFile = async (configFilePath) => {
    try {
        // Importer le fichier de configuration en tant que module
        const modulePath = path.resolve(configFilePath);
        const cssThemeModule = await import(modulePath);

        // Retourner les valeurs de personnalisation
        return cssThemeModule.default.personalize;
    } catch (err) {
        console.error(`Erreur lors de la lecture du fichier de configuration : ${err.message}`);
        return null;
    }
};

// Fonction pour générer les variables CSS à partir des valeurs de personnalisation
export const generateCSSVariables = (personalize) => {
    if (!personalize) {
        console.error('Aucune valeur de personnalisation disponible.');
        return '';
    }

    let cssString = ':root {\n';

    // Générer les variables pour les couleurs
    if (personalize.colors) {
        for (const [name, value] of Object.entries(personalize.colors)) {
            cssString += `  --${name}: ${value};\n`;
        }
    }

    // Ajouter d'autres sections de personnalisation ici...

    cssString += '}\n';

    return cssString;
};
