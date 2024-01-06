import fs from "fs";
import path from "path";

// Searching for a file in a directory
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

// Find a file in the project
export const findFile = (file) => {
    const projectRoot = process.cwd();
    return findFileInDirectory(projectRoot, file);
};
