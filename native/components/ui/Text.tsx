import { styled, Text as RNText } from 'tamagui';

const Text = styled(RNText, {
  name: 'Text',

  // default props
  color: '$textPrimary',

  variants: {
    variant: {
      headline1: {
        fontSize: 36,
        lineHeight: 45,
        fontFamily: '$heading',
        fontWeight: '700',
      },
      headline2: {
        fontSize: 30,
        lineHeight: 37.5,
        fontFamily: '$heading',
        fontWeight: '700',
      },
      headline3: {
        fontSize: 24,
        lineHeight: 30,
        fontFamily: '$heading',
        fontWeight: '700',
      },
      subtitle1: {
        fontSize: 18,
        lineHeight: 22.5,
        fontFamily: '$heading',
        fontWeight: '500',
      },
      subtitle2: {
        fontSize: 16,
        lineHeight: 20,
        fontFamily: '$heading',
        fontWeight: '500',
      },
      body1: {
        fontSize: 16,
        lineHeight: 20,
        fontFamily: '$body',
        fontWeight: '400',
      },
      body2: {
        fontSize: 14,
        lineHeight: 17.5,
        fontFamily: '$body',
        fontWeight: '400',
      },
      body3: {
        fontSize: 12,
        lineHeight: 15,
        fontFamily: '$body',
        fontWeight: '400',
      },
      caption: {
        fontSize: 10,
        lineHeight: 12.5,
        fontFamily: '$body',
        fontWeight: '400',
      },
    },
  },

  defaultVariants: {
    variant: 'body1',
  },
});

export default Text;
