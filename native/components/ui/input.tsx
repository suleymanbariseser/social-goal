import { css } from '@emotion/native';
import { TextInput as RNTextInput, TextInputProps, View } from 'react-native';
import Box from './box';
import withSx from '@/lib/sx/with-sx';
import { useTheme } from '@emotion/react';

const TextInput = withSx(RNTextInput);

type InputWrapperProps = {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  children: React.ReactNode;
};

export const InputWrapper = (props: InputWrapperProps) => {
  return (
    <Box
      sx={{
        flexDirection: 'row',
        width: '100%',
        paddingVertical: 4,
        paddingHorizontal: 6,
        borderRadius: 999,
        alignItems: 'center',
        borderColor: 'text.primary',
        borderStyle: 'solid',
        borderWidth: 1,
      }}
    >
      {props.startAdornment && <View>{props.startAdornment}</View>}
      <View style={css({ flex: 1 })}>{props.children}</View>
      {props.endAdornment && <View>{props.endAdornment}</View>}
    </Box>
  );
};

interface Props extends Omit<InputWrapperProps, 'children'>, TextInputProps {}

export default function Input({
  startAdornment,
  endAdornment,
  ...props
}: Props) {
  const theme = useTheme();

  return (
    <InputWrapper startAdornment={startAdornment} endAdornment={endAdornment}>
      <TextInput
        sx={{
          width: '100%',
          color: 'text.primary',
          ...theme.typography.body1,
        }}
        autoCapitalize='none'
        autoCorrect={false}
        placeholderTextColor={theme.palette.text.secondary}
        {...props}
      />
    </InputWrapper>
  );
}
