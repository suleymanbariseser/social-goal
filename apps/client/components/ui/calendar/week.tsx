import { Stack } from 'tamagui';

import { Day, DayType } from './day';

interface Props {
  days: DayType[];
}

export function Week(props: Props) {
  if (props.days.length !== 7) throw new Error('Week cannot have more than 7 days');

  return (
    <Stack w="100%" fd="row">
      {props.days.map((day, index) => (
        <Day key={`day-${index}`} day={day} />
      ))}
    </Stack>
  );
}
