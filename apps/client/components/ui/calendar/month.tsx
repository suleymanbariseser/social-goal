import { FirstDayOfWeek, useMonth } from '@datepicker-react/hooks';
import { useMemo } from 'react';
import { Stack } from 'tamagui';

import { Week } from './week';

interface Props {
  year: number;
  month: number;
  firstDayOfWeek: FirstDayOfWeek;
}

export function Month({ year, firstDayOfWeek, month }: Props) {
  const { days } = useMonth({
    year,
    month,
    firstDayOfWeek,
  });

  const weeks = useMemo(() => {
    const month: (
      | number
      | {
          dayLabel: string;
          date: Date;
        }
    )[][] = [];

    for (const day of days) {
      const lastWeek = month[month.length - 1];
      if (!lastWeek || lastWeek.length === 7) {
        month.push([day]);
      } else {
        lastWeek.push(day);
        month[month.length - 1] = lastWeek;
      }
    }

    const missingLength = 7 - month[month.length - 1].length;

    for (let i = 0; i < missingLength; i++) {
      month[month.length - 1].push(0);
    }

    return month;
  }, [days]);

  return (
    <Stack gap="$2">
      <Stack w="100%" fd="column" gap="$1">
        {weeks.map((days, index) => (
          <Week key={`week-${index}`} days={days} />
        ))}
      </Stack>
    </Stack>
  );
}
