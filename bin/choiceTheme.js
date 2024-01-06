import themesLists from "../lib/themes.js"
import readlineSync from "readline-sync";

export const choiceTheme = () => {
    // List all available theme names
    const availableThemes = Object.keys(themesLists);
    console.log("Available themes:", availableThemes.join(", "));

    // Allow user to select a theme interactively
    const themeName = readlineSync.keyInSelect(availableThemes, "Select a theme:", { cancel: false });

    if (themeName === -1) {
        console.error("Theme selection canceled. Exiting.");
        process.exit(0);
    }

    return availableThemes[themeName];
}
