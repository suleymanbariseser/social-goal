import { createContext } from 'react';

export type CalendarContextType = {
  focusedDate: Date;
  isDateSelected: (date: Date) => boolean;
  isStartDate: (date: Date) => boolean;
  isEndDate: (date: Date) => boolean;
  isDateBlocked: (date: Date) => boolean;
  isDateFocused: (date: Date) => boolean;
  isDateHovered: (date: Date) => boolean;
  isFirstOrLastSelectedDate: (date: Date) => boolean;

  onDateSelect: (date: Date) => void;
  onDateFocus: (date: Date) => void;
  onDateHover: (date: Date) => void;
};

export const CalendarContext = createContext<CalendarContextType>(null);
