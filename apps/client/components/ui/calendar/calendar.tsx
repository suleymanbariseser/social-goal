import { useDatepicker, getWeekdayLabels, MonthType } from '@datepicker-react/hooks';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import moment from 'moment';
import { useCallback, useMemo } from 'react';
import { Stack } from 'tamagui';

import { Month } from './month';
import { WeekLabels } from './week-labels';
import { Text } from '../text';

type MonthItemType = { title: string } | { month: MonthType };

export function Calendar() {
  const { firstDayOfWeek, activeMonths } = useDatepicker({
    startDate: moment().toDate(),
    endDate: moment().add(1, 'm').toDate(),
    onDatesChange: console.log,
    focusedInput: 'startDate',
  });

  const weekLabels = getWeekdayLabels({ firstDayOfWeek }) as string[];

  const months = useMemo(() => {
    const monthNames = activeMonths.map((m) => moment().month(m.month).format('MMMM'));

    const allMonths: MonthItemType[] = [];

    for (let i = 0; i < monthNames.length; i++) {
      allMonths.push({ title: monthNames[i] });
      allMonths.push({ month: activeMonths[i] });
    }

    return allMonths;
  }, [activeMonths]);

  const renderItem = useCallback(({ item }: ListRenderItemInfo<MonthItemType>) => {
    if ('title' in item)
      return (
        <Stack mb="$4">
          <Text variant="headline3">{item.title}</Text>
        </Stack>
      );

    return (
      <Stack mb="$4">
        <Month month={item.month.month} firstDayOfWeek={firstDayOfWeek} year={item.month.year} />
      </Stack>
    );
  }, []);

  return (
    <Stack f={1} p="$4">
      <FlashList
        data={months}
        renderItem={renderItem}
        keyExtractor={(item) => ('title' in item ? item.title : item.month.date.toString())}
        ListHeaderComponent={
          <Stack mb="$4">
            <WeekLabels labels={weekLabels} />
          </Stack>
        }
        estimatedItemSize={130}
        showsVerticalScrollIndicator={false}
      />
    </Stack>
  );
}
