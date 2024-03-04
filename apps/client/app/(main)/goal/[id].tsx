import { useLocalSearchParams } from 'expo-router';
import moment from 'moment';

import { ActivityList } from '@/components/activity';

type Params = {
  id: string;
  from?: string;
  to?: string;
};

export default function Goal() {
  const { id, from, to } = useLocalSearchParams<Params>();

  const getDate = (date?: string) => {
    if (!date) return undefined;

    const _date = moment(+date);
    if (!_date.isValid()) return undefined;

    return _date.toDate();
  };

  return (
    <ActivityList
      onPress={console.log}
      onPressAvatar={console.log}
      filters={{
        goalId: +id,
        from: getDate(from),
        to: getDate(to),
      }}
    />
  );
}
