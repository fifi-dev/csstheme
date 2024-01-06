
# CSS-THEME

This package npm acts as a CSS theme generator, offering the ability to customize the aesthetic of your websites. Using this package you can easily create a CSS style file containing various variables. All you have to do is choose a theme from a proposed list, and you will get all the associated CSS variables. These variables will then allow you to shape the style of your site according to your preferences.



## Installation

Install css-theme with npm

```bash
  npm install @pfe-css-theme/css-theme
```

Create a CSS file in your project named "cssTheme" because it is in this file that the variables will be generated.
If you don't create it, it will be automatically generated in the root of your project.

You now have the possibility to generate the theme of your choice with this command:
```bash
  cssTheme
```
You now have your "cssTheme.css" file filled with the variables of the theme you have chosen.

## Custom variable
To create your own custom variables, you must define them in your "cssTheme.config.js" file which is located at the root of your project.

To do this, here is an example of your cssTheme.config.js:
```javascript
const cssThemeConfig = {
  theme: "Barbie",
  customVariable: {
    colors: {
        comment: 'Custom colors',
        white: '#CCCCCC'
    },
    spacing: {
        comment: 'Small spacing',
        smallPadding: '10px 5px',
        smallMargin: '15px 10px'
    },
  }
};

export default cssThemeConfig;
```
The "comment" allow you to comment on your code, so don't hesitate to use them.

Once your file is completed, you can rerun the order : 
```bash
  cssTheme
```

And you will find in your "cssTheme.css" file the variables of your theme as well as the one that you added in the config file.
## Authors

- [AZOULAY Karen](https://github.com/Karen160)
- [BAZANA NTOMO Fideline](https://github.com/fifi-dev)
- [OUEDRAOGO Coralie](https://github.com/coralieO)
