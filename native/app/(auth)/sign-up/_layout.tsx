import { css } from '@emotion/native';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import { Theme } from '../../../lib/theme';
import { useTheme } from '@emotion/react';

export const unstable_settings = {
  initialRouteName: 'name-surname',
};

const headerStyle = css({
  backgroundColor: 'transparent',
});

const contentStyle = css({
  backgroundColor: 'transparent',
});

export default function AuthLayout() {
  const theme = useTheme();
  return (
    <View
      style={css({
        flex: 1,
        backgroundColor: theme.palette.secondary,
        paddingHorizontal: theme.spacing.sm,
      })}
    >
      <Stack>
        <Stack.Screen
          name='name-surname'
          options={{
            title: 'Sign up',
            headerStyle,
            contentStyle,
            headerTitleStyle: css({
              color: theme.palette.text,
            }),
          }}
        />
      </Stack>
    </View>
  );
}
