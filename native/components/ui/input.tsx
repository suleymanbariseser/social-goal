import styled, { css } from '@emotion/native';
import Row from './row';
import { TextInput, TextInputProps, View } from 'react-native';
import { useTheme } from '@emotion/react';

type InputWrapperProps = {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  children: React.ReactNode;
};

export const InputWrapper = (props: InputWrapperProps) => {
  const theme = useTheme();
  return (
    <Row
      gap={1}
      style={css({
        backgroundColor: theme.palette.text,
        width: '100%',
        padding: theme.spacing * 4,
        borderRadius: 999,
      })}
    >
      {props.startAdornment && <View>{props.startAdornment}</View>}
      <View style={css({ flex: 1 })}>{props.children}</View>
      {props.endAdornment && <View>{props.endAdornment}</View>}
    </Row>
  );
};

interface Props extends Omit<InputWrapperProps, 'children'>, TextInputProps {}

export default function Input({
  startAdornment,
  endAdornment,
  ...props
}: Props) {
  return (
    <InputWrapper startAdornment={startAdornment} endAdornment={endAdornment}>
      <TextInput
        style={css({
          width: '100%',
        })}
        autoCapitalize='none'
        autoCorrect={false}
        {...props}
      />
    </InputWrapper>
  );
}
