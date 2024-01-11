// Importez la fonction generateVariable depuis le fichier approprié
import { generateVariable } from 'chemin-vers-le-fichier/generateVariable';

// Generate CSS classes for the selected theme
export const generateCss = (selectedThemeName, theme, customVariables) => {
    let cssString = '';

    // Generate theme variables
    const themeVariables = generateVariable([
        {
        values: theme,
        comment: `/* Theme: ${selectedThemeName} */\n`
        },
        {
        values: customVariables,
        comment: `\n/* Custom variables */\n`
        }
    ]);

    cssString += themeVariables;

    // Generate font import for the selected theme
    cssString += generateFontImport(theme.fontfamilies);

    // Generate font-family classes for the selected theme
    cssString += generateFontFamilyClasses(selectedThemeName, theme.fontfamilies);

    // Generate padding classes for the selected theme
    cssString += generatePaddingClasses(selectedThemeName, theme.padding);

    // Add other theme-specific classes here if needed

    return cssString;
};

// Generate font import
const generateFontImport = (fontFamilies) => {
    const { titles, body } = fontFamilies;
    const fontsToImport = [titles, body].filter((font) => font);

    if (fontsToImport.length === 0) {
        return ''; // No fonts to import
    }

    const fontImportUrl = `https://fonts.googleapis.com/css2?family=${fontsToImport.join('&family=')}&display=swap`;

    return `@import url('${fontImportUrl}');\n`;
};

// Generate font-family classes
const generateFontFamilyClasses = (themeName, fontFamilies) => {
    let cssString = '';

    cssString += `/* Font Family Classes for ${themeName} */\n`;

    // Check if titles and body fonts are different
    if (fontFamilies.titles !== fontFamilies.body) {
        cssString += `/* Font Family for Titles (h1 to h6) */\n`;
        cssString += `h1, h2, h3, h4, h5, h6 {\n`;
        cssString += `  font-family: var(--${themeName}-titles);\n`;
        cssString += `}\n`;
    }

    cssString += `/* Font Family for Body */\n`;
    cssString += `.${themeName}-body {\n`;
    cssString += `  font-family: var(--${themeName}-body);\n`;
    cssString += `}\n`;

    return cssString;
};

// Generate padding classes
const generatePaddingClasses = (themeName, paddingValues) => {
    let cssString = '';

    cssString += `/* Padding Classes for ${themeName} */\n`;

    for (const [className, value] of Object.entries(paddingValues)) {
        cssString += `.${themeName}-${className} {\n`;
        cssString += `  padding-left: var(--${themeName}-${className});
        padding-right: var(--${themeName}-${className});\n`;
        cssString += `}\n`;
    }

    return cssString;
};
