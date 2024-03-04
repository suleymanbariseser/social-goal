import { Eye } from '@tamagui/lucide-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import moment from 'moment';
import { ColorTokens, Stack } from 'tamagui';

import { useGoalGraphContext } from '../context';

type Props = {
  goalId: number;
  count: number;
  date: string;
};

export const ActivityIndicatorItem = ({ goalId, count, date }: Props) => {
  const { settings, startDate, focusedDetails, setFocusedDetails } = useGoalGraphContext();
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const diff = moment(date).diff(startDate, 'days');

  // TODO find better counts
  const col: ColorTokens =
    count > 5 ? '$primaryDark' : count > 3 ? '$primaryMain' : '$primaryLight';

  const isHighlighted =
    focusedDetails && focusedDetails.goalId === goalId && focusedDetails.date === date;

  const handlePress = () => {
    if (isHighlighted) {
      router.push(`/goal/${id}`);
      return;
    }

    setFocusedDetails({
      goalId,
      date,
    });
  };

  return (
    <Stack
      key={date}
      pos="absolute"
      t={0}
      l={diff * settings.dayWidth}
      w={settings.dayWidth}
      h="100%"
      bg={col}
      onPress={handlePress}
      bw={3}
      bs="solid"
      ai="center"
      jc="center"
      boc={isHighlighted ? '$backgroundPaper' : '$transparent'}>
      {isHighlighted ? <Eye /> : null}
    </Stack>
  );
};
