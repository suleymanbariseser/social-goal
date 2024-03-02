import moment from 'moment';
import { Stack } from 'tamagui';

import { ActivityIndicatorItem } from './activity-indicator-item';

export type ActivitySummary = {
  id: number;
  createdAt: Date;
};

type Props = {
  activities: ActivitySummary[];
  goalId: number;
};

export const ActivityIndicatorList = ({ goalId, activities }: Props) => {
  const getDays = () => {
    const days = new Map<string, number>();

    activities.forEach((activity) => {
      const date = moment(activity.createdAt).startOf('day').toString();

      days.set(date, days.has(date) ? days.get(date) + 1 : 1);
    });

    return days;
  };

  const days = getDays();

  return (
    <Stack l={0} t={0} w="100%" h="100%" pos="absolute">
      {[...days.entries()].map(([date, count]) => (
        <ActivityIndicatorItem key={date} goalId={goalId} date={date} count={count} />
      ))}
    </Stack>
  );
};
