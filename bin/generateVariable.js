// Generating CSS variables
export const generateVariable = (valuesToGenerate) => {
    let cssString = `:root {\n`;

    for (const { values, comment } of valuesToGenerate) {
        cssString += comment;
        for (const section in values) {
            if (Object.hasOwnProperty.call(values, section)) {
                const variables = values[section];
                if (variables) {
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
        }
    }

    cssString += '}\n';

    return cssString;
};
