import moment from 'moment';

type DayOptions = {
  startDate: Date;
  endDate: Date;
};

export const getDays = ({ startDate, endDate }: DayOptions): Date[] => {
  let start = moment(startDate).startOf('day');
  const end = moment(endDate).startOf('day');

  const days = [];
  while (start.isSameOrBefore(end)) {
    days.push(start.toString());
    start = start.clone().add(1, 'day');
  }

  return days;
};

type WeekOptions = {
  startDate: Date;
  endDate: Date;
};

export const getWeeks = ({ startDate, endDate }: WeekOptions): Date[][] => {
  const weeks = [];
  let startOfWeek = moment(startDate);

  while (moment(startOfWeek).isSameOrBefore(endDate)) {
    let endOfWeek = moment(startOfWeek).endOf('week');

    if (endOfWeek.isAfter(endDate)) {
      endOfWeek = moment(endDate);
    }

    const days = getDays({ startDate: startOfWeek.toDate(), endDate: endOfWeek.toDate() });

    weeks.push(days);

    startOfWeek = startOfWeek.add(1, 'week').startOf('week');
  }

  return weeks;
};
