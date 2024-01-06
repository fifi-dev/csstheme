export const generateVariable = (theme) => {
    let cssString = ':root {\n';

    for (const section in theme) {
        if (Object.hasOwnProperty.call(theme, section)) {
            const variables = theme[section];

            if (variables.comment) {
                cssString += `/* ${variables.comment} */\n`;
            }

            for (const [name, value] of Object.entries(variables)) {
                if (name !== 'comment') {
                    cssString += `  --${name}: ${value};\n`;
                }
            }
        }
    }

    cssString += '}\n';

    return cssString;
};
