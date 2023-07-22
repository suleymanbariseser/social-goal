import { Stack } from 'tamagui';

import { Text } from '../text';

export type DayType =
  | number
  | {
      dayLabel: string;
      date: Date;
    };

interface Props {
  day: DayType;
}

export function Day(props: Props) {
  if (typeof props.day === 'number') return <Stack f={1} h={40} />;

  return (
    <Stack h={40} f={1} ai="center" jc="center" onPress={console.log} pressStyle={{ opacity: 0.8 }}>
      <Text>{props.day.dayLabel}</Text>
    </Stack>
  );
}
