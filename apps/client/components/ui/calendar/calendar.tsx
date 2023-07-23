import {
  useDatepicker,
  getWeekdayLabels,
  MonthType,
  OnDatesChangeProps,
  FocusedInput,
} from '@datepicker-react/hooks';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import moment from 'moment';
import { useCallback, useMemo } from 'react';
import { Stack } from 'tamagui';

import { CalendarContext } from './context';
import { Month } from './month';
import { WeekLabels } from './week-labels';
import { Text } from '../text';

type MonthItemType = { title: string } | { month: MonthType };

interface Props {
  startDate: Date | null;
  endDate: Date | null;

  onDatesChange?: (data: OnDatesChangeProps) => void;
  focusedInput: FocusedInput;

  minBookingDate?: Date;
  maxBookingDate?: Date;

  /**
   * @default 12
   */
  numberOfMonths?: number;
}

export function Calendar({
  startDate,
  endDate,
  numberOfMonths = 12,
  minBookingDate,
  maxBookingDate,
  onDatesChange,
  focusedInput,
}: Props) {
  const {
    firstDayOfWeek,
    activeMonths,
    focusedDate,
    isDateSelected,
    isStartDate,
    isEndDate,
    onDateSelect,
    isDateBlocked,
    isDateFocused,
    isDateHovered,
    onDateFocus,
    onDateHover,
    isFirstOrLastSelectedDate,
  } = useDatepicker({
    startDate,
    endDate,
    onDatesChange,
    numberOfMonths,
    focusedInput,
    minBookingDate,
    maxBookingDate,
    changeActiveMonthOnSelect: false,
    firstDayOfWeek: 1,
    minBookingDays: 1,
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
      <CalendarContext.Provider
        value={{
          focusedDate,
          isDateSelected,
          onDateSelect,
          isStartDate,
          isEndDate,
          isDateBlocked,
          isDateFocused,
          isDateHovered,
          onDateFocus,
          onDateHover,
          isFirstOrLastSelectedDate,
        }}>
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
      </CalendarContext.Provider>
    </Stack>
  );
}
