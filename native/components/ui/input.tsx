import { Input, styled } from 'tamagui';

export default styled(Input, {
  name: 'Input',

  br: '$12',
  px: '$4',
  backgroundColor: '$backgroundTransparent',
  borderColor: '$textPrimary',
  color: '$textPrimary',
  borderRadius: '$12',
  autoCapitalize: 'none',
  autoCorrect: false,
  placeholderTextColor: '$textPrimary',
  minHeight: 50,

  focusStyle: {
    borderColor: '$textPrimary',
  },
});
