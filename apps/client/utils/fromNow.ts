import moment from 'moment';

export const fromNow = (date: Date) => {
  return moment().diff(moment(date), 'w') >= 1
    ? moment(date).format('DD.MM.YYYY')
    : moment(date).fromNow(true);
};
