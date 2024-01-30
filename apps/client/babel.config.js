module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      '@babel/plugin-proposal-export-namespace-from',
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '@': './',
          },
        },
      ],
      [
        'transform-inline-environment-variables',
        {
          include: ['TAMAGUI_TARGET'],
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
