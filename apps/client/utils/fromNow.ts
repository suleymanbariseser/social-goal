import moment from 'moment';

export const fromNow = (date: Date) => {
  console.log('date', moment(date).diff(moment(), 'w'));
  return moment().diff(moment(date), 'w') >= 1
    ? moment(date).format('DD.MM.YYYY')
    : moment(date).fromNow(true);
};
