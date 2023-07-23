import { useDay } from '@datepicker-react/hooks';
import { useContext } from 'react';
import { Stack } from 'tamagui';

import { CalendarContext } from './context';
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
  const {
    isDateSelected,
    isEndDate,
    isStartDate,
    onDateSelect,
    isDateBlocked,
    focusedDate,
    isDateFocused,
    isDateHovered,
    isFirstOrLastSelectedDate,
    onDateFocus,
    onDateHover,
  } = useContext(CalendarContext);

  const { isSelected, disabledDate, onMouseEnter, onClick, tabIndex } = useDay({
    date: typeof props.day === 'number' ? new Date() : props.day.date,
    focusedDate,
    isDateBlocked,
    isDateFocused,
    isDateHovered,
    isDateSelected,
    isFirstOrLastSelectedDate,
    onDateFocus,
    onDateHover,
    onDateSelect,
  });

  if (typeof props.day === 'number') return <Stack f={1} h={40} />;

  const { date, dayLabel } = props.day;

  const isStart = isStartDate(date);
  const isEnd = isEndDate(date);

  return (
    <Stack
      h={40}
      f={1}
      ai="center"
      jc="center"
      onPress={onClick}
      tabIndex={tabIndex}
      onMouseEnter={onMouseEnter}
      bg={isSelected || isStart || isEnd ? '$backgroundBox' : undefined}
      btlr={isStart ? '$6' : undefined}
      bblr={isStart ? '$6' : undefined}
      btrr={isEnd ? '$6' : undefined}
      bbrr={isEnd ? '$6' : undefined}
      disabled={disabledDate}
      opacity={disabledDate ? 0.2 : undefined}
      pressStyle={disabledDate ? undefined : { opacity: 0.8 }}>
      <Text>{dayLabel}</Text>
    </Stack>
  );
}
