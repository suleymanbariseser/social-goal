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
            '@/components': './components',
            '@/lib': './lib',
            '@/context': './context',
            '@/assets': './assets',
          },
        },
      ],
      require.resolve('expo-router/babel'),
      ['transform-inline-environment-variables', {
        include: ['TAMAGUI_TARGET']
      }],
      'react-native-reanimated/plugin',
    ],
  };
};
