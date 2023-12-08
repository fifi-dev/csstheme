import fs from "fs";
import path from "path";

// Function to recursively search for a file in a directory
const findFileInDirectory = (directory, fileName) => {
    const files = fs.readdirSync(directory);

    for (const file of files) {
        const filePath = path.join(directory, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            const result = findFileInDirectory(filePath, fileName);
            if (result) {
                return result;
            }
        } else if (file === fileName) {
            return filePath;
        }
    }

    return null;
};

// Function to find variables.css in the project
export const findFile = (file) => {
    // Assuming this script is in the root of your project
    const projectRoot = process.cwd();  // Get the current working directory
    return findFileInDirectory(projectRoot, file);
};
