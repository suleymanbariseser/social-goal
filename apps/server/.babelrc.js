const path = require('path');
const tsConfig = require('./tsconfig.json');

module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    [
      'module-resolver',
      {
        root: [path.resolve(tsConfig.compilerOptions.baseUrl)],
      },
    ],
  ],
};
