import moment from 'moment';
import { ColorTokens, Stack } from 'tamagui';

import { useGoalGraphContext } from '../context';

type Props = {
  count: number;
  date: string;
};

export const ActivityIndicatorItem = ({ count, date }: Props) => {
  const { settings, startDate } = useGoalGraphContext();

  const diff = moment(date).diff(startDate, 'days');

  // TODO find better counts
  const col: ColorTokens =
    count > 5 ? '$primaryDark' : count > 3 ? '$primaryMain' : '$primaryLight';

  return (
    <Stack
      key={date}
      pos="absolute"
      t={0}
      l={diff * settings.dayWidth}
      w={settings.dayWidth}
      h="100%"
      bg={col}
    />
  );
};
