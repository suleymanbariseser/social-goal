const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');

const defaultAssetExts = config.resolver.assetExts;
const defaultSourceExts = config.resolver.sourceExts;

config.resolver.assetExts = defaultAssetExts.filter((ext) => ext !== 'svg');
config.resolver.sourceExts = [...defaultSourceExts, 'svg'];

module.exports = config;
