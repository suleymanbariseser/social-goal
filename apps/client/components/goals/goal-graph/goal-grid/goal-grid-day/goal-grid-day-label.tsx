import moment from 'moment';
import { Stack } from 'tamagui';

import { Text } from '@/components/ui/text';

type Props = {
  day: Date;
};

export const GoalGridDayLabel = ({ day }: Props) => {
  const dayLabel = moment(day).format('ddd');
  const dayDate = moment(day).format('DD.MM.YY');

  return (
    <Stack ai="center">
      <Text variant="body3">{dayLabel}</Text>
      <Text variant="caption" col="$textSecondary">
        {dayDate}
      </Text>
    </Stack>
  );
};
