import { Input, styled } from 'tamagui';

export default styled(Input, {
  name: 'Input',

  br: '$12',
  backgroundColor: '$backgroundTransparent',
  borderColor: '$textPrimary',
  color: '$textPrimary',
  borderRadius: '$12',
  autoCapitalize: 'none',
  autoCorrect: false,
  placeholderTextColor: '$textPrimary',

  focusStyle: {
    borderColor: '$textPrimary',
  },
});
