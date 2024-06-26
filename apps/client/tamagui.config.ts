import { createAnimations } from '@tamagui/animations-react-native';
import { createInterFont } from '@tamagui/font-inter';
import { createMedia } from '@tamagui/react-native-media-driver';
import { shorthands } from '@tamagui/shorthands';
import { themes, tokens } from '@tamagui/themes';
import { createTamagui, createTokens } from 'tamagui';

const animations = createAnimations({
  bouncy: {
    type: 'spring',
    damping: 10,
    mass: 0.9,
    stiffness: 100,
  },
  lazy: {
    type: 'spring',
    damping: 20,
    stiffness: 60,
  },
  quick: {
    type: 'spring',
    damping: 20,
    mass: 1.2,
    stiffness: 250,
  },
});

const headingFont = createInterFont();
const bodyFont = createInterFont();

const size = {
  ...tokens.size,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 48,
  12: 56,
  13: 64,
  14: 72,
  15: 80,
  16: 96,
  17: 112,
  18: 128,
};

const newTokens = createTokens({
  color: {
    ...tokens.color,
    transparent: 'transparent',
    primaryDark: '#7AA2E3',
    primaryMain: '#6AD4DD',
    primaryLight: '#97E7E1',
    secondaryDark: '#F7418F',
    secondaryMain: '#FC819E',
    secondaryLight: '#FEC7B4',
    successMain: '#05A660',
    errorMain: '#E53535',
    warningMain: '#E57A00',
    infoMain: '#00B7C4',
    backgroundMain: '#0C0C0C',
    backgroundPaper: '#222831',
    backgroundBox: '#31363F',
    textPrimary: '#FFFFFF',
    textSecondary: '#97979A',
  },
  size,
  radius: tokens.radius,
  space: size,
  zIndex: tokens.zIndex,
});

const config = createTamagui({
  animations,
  defaultTheme: 'dark',
  shouldAddPrefersColorThemes: false,
  themeClassNameOnRoot: false,
  shorthands,
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },

  themes,
  tokens: newTokens,
  media: createMedia({
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  }),
});

export type AppConfig = typeof config;

declare module 'tamagui' {
  // overrides TamaguiCustomConfig so your custom types

  // work everywhere you import `tamagui`

  interface TamaguiCustomConfig extends AppConfig {}
}
export default config;
