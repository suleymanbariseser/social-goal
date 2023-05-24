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
  tokens: {
    ...tokens,
    space: {
      ...tokens.space,
      1: 4,
      2: 8,
      3: 12,
      4: 16,
      5: 20,
      6: 24,
      7: 28,
      8: 32,
    },
    color: {
      primaryMain: '#1D4ED8',
      primaryLight: '#60A5FA',
      secondaryMain: '#A21CAF',
      secondaryLight: '#E879F9',
      successMain: '#05A660',
      errorMain: '#E53535',
      warningMain: '#E57A00',
      infoMain: '#00B7C4',
      backgroundMain: '#0D0D0D',
      backgroundPaper: '#D9D9D9',
      backgroundBox: '#50546B',
      textPrimary: '#FFFFFF',
      textSecondary: '#E4E4EB',
    },
  },
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
