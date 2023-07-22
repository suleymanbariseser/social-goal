import { Stack } from 'tamagui';

import { Text } from '../text';

interface Props {
  labels: string[];
}

export function WeekLabels(props: Props) {
  return (
    <Stack fd="row" gap="$1" py="$1" bbc="$textSecondary" bbw={1} bs="solid">
      {props.labels.map((label) => (
        <Stack f={1} key={label} ai="center">
          <Text variant="subtitle1">{label}</Text>
        </Stack>
      ))}
    </Stack>
  );
}
